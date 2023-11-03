const getHomePage = async(req, res) => {
    res.status(200).json({"msg" : "got home page"})
}

const getAboutPage = async(req, res) => {
    res.status(200).json({"msg" : "got about page"})
}

module.exports = {
    getHomePage,
    getAboutPage,
}