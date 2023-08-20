const generateUserErrorInfo = (producto) => {
    return `
        Una o mas prpiedades esta incompleta o es invalida
        lista de propiedades:
      * title : Necesita dato tipo string, recibe esto: ${producto.title}
      * description  : Necesita dato tipo string, recibe esto: ${producto.description}
      * category      : Necesita dato tipo string, recibe esto: ${producto.category}
      * price      : Necesita dato tipo number, recibe esto: ${producto.price}
      * stock      : Necesita dato tipo number, recibe esto: ${producto.stock}
    `;
};

export default generateUserErrorInfo;