import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Resto de tu código...

const notificaciones = [
    {
        id: 1,
        cuerpo: 'tienes una una solicitud 1'
    },
    {
        id: 2,
        cuerpo: 'tienes una una solicitud 2'
    },
    {
        id: 3,
        cuerpo: 'tienes una una solicitud 3'
    }
    ];

app.get('/notificaciones', (req, res) => {
    res.status(200).json({
        success: true,
        notificaciones
    })
})

app.post('/notificaciones', (req, res) => {
    const idNotificacion = notificaciones.length > 0 ? notificaciones[notificaciones.length - 1].id + 1 : 1;

    const notificacion = {
        id:  idNotificacion,
        cuerpo: req.body.cuerpo
    }

    notificaciones.push(notificacion);

    res.json({
        success: true,
        notificacion
    })
})

app.get('/notificaciones-nuevas', (req, res) => {
    const idLastNoti = typeof req.query.idLastNoti === 'string' ? parseInt(req.query.idLastNoti, 10) : 0;
    const nuevasNotificaciones = notificaciones.filter(notificacion  => notificacion.id > idLastNoti);

    res.status(200).json({
        success: true,
        notificaciones: nuevasNotificaciones
    })
})




app.listen(3001, () => (console.log('Server on port 3001')));
