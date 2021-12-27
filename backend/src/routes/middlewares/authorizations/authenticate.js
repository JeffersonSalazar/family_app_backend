module.exports = async (req, res, next) => {
    const tokenHeader = req.headers['authorization'];

    if (!tokenHeader) {
        res.status(401).json({ msn: 'no cuentas con un token de acceso' });
    } else {
        let bearerToken = tokenHeader.split(" ")[1];

        req.token = bearerToken;

        next();
    }
}