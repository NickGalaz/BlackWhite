const yargs = require('yargs')
const child = require('child_process')



const key = 123
const argv = yargs
    .command(
        'acceso',
        'Clave para acceder a servidor',
        {
            key: {
                describe: 'key',
                demand: true,
                alias: 'k',
            }
        },
        (args) => {
            args.key == key
                ? 
                child.exec('node servidor.js', (err, stdout) => {
                    err ? console.log(err) : console.log(stdout)
                })
                : 
                console.log('Credenciales incorrectas')
        }
    )
    .help().argv;
