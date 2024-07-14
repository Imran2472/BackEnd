import Book from '../modal/modal.js'

export const Getbook  = async (req, res) =>{
    try {
        const book = await Book.find()
        res.status(200).json(book)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}