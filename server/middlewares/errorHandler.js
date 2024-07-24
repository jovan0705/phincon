
const ErrorHandler = (err, req, res, next) => {
    switch (err.name) {
        case 'pokemonNotFound': {
            res.status(400).json({message: "My Pokemon with not found"})
            break;
        }
        
        default: {
            res.status(500).json({message: "Internal Server Error"})
            break;
        }
           
    }
}

module.exports = ErrorHandler