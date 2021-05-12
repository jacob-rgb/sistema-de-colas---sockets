// Referencias HTML

const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlerta = document.querySelector('.alert');
const pendientes = document.querySelector('#lblPendientes')


const searchParams  = new URLSearchParams( window.location.search );

if( !searchParams.has('escritorio')) {
    throw new Error('el Escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText += ' ' + escritorio;

divAlerta.style.display = 'none'


const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});

socket.on('ultimo-ticket', (ultimo) => {
    
    // lblNuevoTicket.innerText = 'Ticket ' + ultimo

});

socket.on('tickets-pendientes', (numTickets) => {
    pendientes.innerText = numTickets
})




btnAtender.addEventListener( 'click', () => {

    socket.emit('atender-ticket', {escritorio}, ( {ok, ticket, msg} ) => {
        if(!ok) {
            lblTicket.innerText = ` Nadie `;
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = `Ticket ${ticket.numero}`


    })
 
    // socket.emit( 'siguiente-ticket', null, ( ticket ) => {
    //    lblNuevoTicket.innerText = ticket;
    // });

});