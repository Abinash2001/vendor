import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: String,
});

const Category = mongoose.models.Categories || mongoose.model('Categories', categorySchema);

export default Category;


// import mongoose from 'mongoose';

// const categorySchema = new mongoose.Schema({
//     name: String,
// });

// let Category;

// try {
//     // Check if the model has already been compiled
//     Category = mongoose.model('Categories');
// } catch (error) {
//     // If not, compile the model
//     Category = mongoose.model('Categories', categorySchema);
// }

// export default Category;
