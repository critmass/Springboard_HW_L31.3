

const fs = require('fs')


function cat( path ){

    try {
        // store the read file contents
        const contents = fs.readFileSync(path, 'utf8');
        console.log(`${ contents }`);
    } 
    catch (error) {
        // errors thrown by fs will be caught here
        console.error(
            `Error reading ${ error.path }: \nError: ${ error.code }: no such file or directory, ${ error.syscall} ${ error.path }`);
        // kill the process and tell the shell it errored
        process.exit(1);
    }
}

const argv = process.argv;

cat( argv.pop() )