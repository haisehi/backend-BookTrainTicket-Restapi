const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
//auth jwt
const cookieParser = require('cookie-parser');

//routes
const trainRoutes = require('./routes/train')
const roomRoutes = require('./routes/room')
const ticketsRoutes = require('./routes/ticket')
const customersRoutes = require('./routes/customer')
const StationRoutes = require('./routes/Station')
//jwt admin
const authRoutes = require('./routes/auth')
// const cartRoutes = require('./routes/cart')
// const chairRoutes = require('./routes/chair')

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

app.use(bodyParser.json({ limit: "50mb" }))
app.use(cors())
app.use(morgan("common"))
//auth jwt
app.use(cookieParser())
app.use(express.json())

//ROUTES
app.use("/v1/train", trainRoutes)
app.use("/v1/room", roomRoutes)
app.use("/v1/ticket", ticketsRoutes)
app.use("/v1/customer", customersRoutes)
app.use("/v1/station", StationRoutes)
// app.use("/v1/chair" ,chairRoutes)
// app.use("/v1/cart",cartRoutes)
//jwt
app.use("/v1/auth",authRoutes)

//port : 8000
app.listen(8000, () => {
  console.log('Server is running on port 8000')
})

//authentication : so sánh username và password của người dùng nhập vào với username và password trên database
//authorization :chức năng phân quyền
