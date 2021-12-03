const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

mongoose.connect(URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false
});

// mongoose
//      .connect( URI)
//      .then(() => console.log( 'Database Connected' ))
//      .catch(err => console.log( err ));

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('database is connected');
});