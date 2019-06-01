const renderMW = (file) => {
    return (req, res) => {
        res.render(file)
    }
}

module.exports = renderMW