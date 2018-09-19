module.exports = async function allowPipe() {
	function handleEPIPE(err) {
		if (err.errno !== 'EPIPE') {
			throw err;
		}
	}
	process.stdout.on('error', handleEPIPE);
	process.stderr.on('error', handleEPIPE);
};
