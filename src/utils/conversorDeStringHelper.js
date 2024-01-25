module.exports = (objetoParams) => {
    for (let propriedade in objetoParams) {
        // Checa se a chave do objeto possui em seu nome a string Id ou id
        if (/Id|id/.test(propriedade)) {
            objetoParams[propriedade] = Number(objetoParams[propriedade]);
        }
        return objetoParams;
    }
}