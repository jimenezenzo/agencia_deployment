import {Viaje} from "../models/Viaje.js";
import {Testimonial} from "../models/Testimoniales.js";

const paginaInicio = async (req, res) => {
    const promiseBD = [];

    promiseBD.push(Viaje.findAll({limit: 3}));
    promiseBD.push(Testimonial.findAll({limit: 3}))

    try {
        const resultado = await Promise.all(promiseBD);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (e) {
        console.log(error)
    }
}

const paginaNosotros = (req, res) => {
    res.render('Nosotros',{
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {
    const dataViajes = await Viaje.findAll();

    res.render('Viajes', {
        pagina: 'Proximos viajes',
        viajes : dataViajes
    });
}

const paginaDetalleViaje = async (req, res) => {
    const {slug} = req.params;

    try {
        const resultado = await Viaje.findOne({where : {slug}})
        res.render('viaje', {
            pagina: 'Viaje detalle',
            resultado
        });
    }catch (error){
        console.log(error)
    }
}

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll();

        res.render('Testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    }catch (error) {
        console.log(error)
    }
}

export{
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}
