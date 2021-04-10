

const fs = require('fs')
const axios = require('axios')


function cat( path ){

    try {
        // store the read file contents
        const contents = fs.readFileSync(path, 'utf8');
        console.log(`${ contents }`);
    } 
    catch (err) {
        // errors thrown by fs will be caught here
        console.error(
            `Error reading ${ err.path }:
        Error: ${ err.code }: no such file or directory, ${ err.syscall} ${ err.path }`
        );
        // kill the process and tell the shell it errored
        process.exit(1);
    }
}

async function webCat( URL ){

    try{
        
        const page = await axios.get(URL)

        console.log( page.data )
    }
    catch (err) {
        console.error( 
            `Error fetching ${ err.config.url }:
        Error: Request failed with status code ${ err.response.status }` 
        )

        process.exit(1)
    }

    
}


const argv = process.argv;

const element = argv.pop()

if( element.includes("//") ){
    webCat( element )
}
else{
    cat( element )
}
