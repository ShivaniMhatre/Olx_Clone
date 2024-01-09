import ProductModel from "../Models/ProductModel.js";
import UserModel from "../Models/UserModel.js";

export const AddProduct = (req, res) => {
    // console.log(req.body);
    // console.log(req.file.path);
    const pname = req.body.pname;
    const pdesc = req.body.pdesc;
    const pcate = req.body.pcate;
    const pprice = req.body.pprice;
    const pimage = req.file.path;



    const product = new ProductModel({
        pname,
        pdesc,
        pcate,
        pprice,
        pimage,

    });
    product.save()
        .then(() => {
            res.send({ message: "saved success" })
        })
        .catch(() => {
            res.send({ message: "server err" })
        })
}

export const Get_Product = (req, res) => {
    ProductModel.find()
        .then((result) => {
            res.send({ message: "success", product: result })
        })
        .catch((err) => {
            res.send({ message: "server err" })
        })
}

export const Liked_Product = (req, res) => {
    let productId = req.body.productId;
    let userId = req.body.userId;
    UserModel.updateOne({ _id: userId }, { $addToSet: { likedProduct: productId } })
    .then(() => {
        res.send({ message: "success" })
    })
    .catch((err) => {
        res.send({ message: "server err" })
    })

}
export const Get_Liked_Product = (req, res) => {
    UserModel.find().populate('likedProduct')
        .then((result) => {
            res.send({ message: "success", product: result })
            // console.log(result)
        })
        .catch((err) => {
            res.send({ message: "server err" })
        })
}