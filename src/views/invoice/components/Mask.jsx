function Mask (props) { 
    let x = props.num_factura;
    console.log(x);
    const mascara = '00000000';
    mascara = mascara.substring(0,8-(x));
    return mascara;
}