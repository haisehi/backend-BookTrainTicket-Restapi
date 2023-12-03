const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
//socketIo
const http = require('http'); // Sử dụng http để tạo server
const socketIo = require('socket.io');
//auth jwt
const cookieParser = require('cookie-parser');
//path
const path = require('path');
//routes
const trainRoutes = require('./routes/train')
const roomRoutes = require('./routes/room')
const ticketsRoutes = require('./routes/ticket')
const customersRoutes = require('./routes/customer')
const StationRoutes = require('./routes/Station')
const contentRoutes = require('./routes/ScheduleContent')
//jwt admin routes
const authRoutes = require('./routes/JWTadminRoutes/auth')
const userRoutes = require('./routes/JWTadminRoutes/user')
// JWT account user routes
const accUserRoutes = require('./routes/JWTadminRoutes/accUser')

// ----------------------------------------------------------------

//CONNECT DATABASE MONGODB (mongodb@4.0)
dotenv.config()
// Thay vì sử dụng callback, sử dụng Promises hoặc async/await
mongoose
  .connect((process.env.MONGODB_URL), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Thực hiện các tác vụ sau khi kết nối thành công
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// socketIO
const apiFE = process.env.API_URL_FE
const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: `${apiFE}`, // Điều này là origin của ứng dụng React của bạn
//     methods: ['GET', 'POST'],
//     credentials: true,
//     optionSuccessStatus: 200,
//   },
// });


app.use(bodyParser.json({ limit: "50mb" }))
// Đoạn mã trên cho phép truy cập từ origin http://localhost:3000 và bật credentials (cần cho các request có chứa cookie).
const corsOptions = {
  origin: apiFE,
  credentials: true,
  optionSuccessStatus: 200,
};
// Middleware CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', apiFE);
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors(corsOptions));
// app.use(cors());
app.use(morgan("common"))
//auth jwt
app.use(cookieParser())
app.use(express.json())
//ROUTES
app.use("/v1/train", trainRoutes)
app.use("/v1/room", roomRoutes)
app.use("/v1/tickets", ticketsRoutes)
app.use("/v1/customer", customersRoutes)
app.use("/v1/station", StationRoutes)
app.use("/v1/content", contentRoutes)
//jwt admin routes
app.use("/v1/auth", authRoutes)
app.use("/v1/user", userRoutes)
//JWT account user routes
app.use("/v1/accUser", accUserRoutes)
// Sử dụng tệp tĩnh để phục vụ ảnh
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// connect socket
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });
const port = process.env.PORT
// Sử dụng server thay vì app.listen
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

//authentication : so sánh username và password của người dùng nhập vào với username và password trên database
//authorization :chức năng phân quyền
//Json web token : xác thực người dùng
