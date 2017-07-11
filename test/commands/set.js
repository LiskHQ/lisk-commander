const Vorpal = require('vorpal');
const set = require('../../src/commands/set');

const vorpal = new Vorpal();

vorpal.use(set);
vorpal.pipe(() => '');

describe('set command', () => {
  describe('should exist', () => {
    // eslint-disable-next-line no-underscore-dangle
    const filterCommand = vorpalCommand => vorpalCommand._name === 'set';

    const exists = vorpal.commands.filter(filterCommand);

    it('should be available', () => {
      // eslint-disable-next-line no-underscore-dangle
      (exists[0]._args).should.be.length(2);
      // eslint-disable-next-line no-underscore-dangle
      (exists[0]._name).should.be.equal('set');
    });

    it('should have 2 require inputs', () => {
      // eslint-disable-next-line no-underscore-dangle
      (exists[0]._args[0].required).should.be.true();
      // eslint-disable-next-line no-underscore-dangle
      (exists[0]._args[1].required).should.be.true();
    });
  });

  describe('should set json to true', () => {
    it('should be set json true and give feedback', () => {
      const command = 'set json true';

      const res = vorpal.execSync(command);
      (res).should.be.equal('successfully set json output to true');
    });

    it('should be set json back to false and give feedback', () => {
      const command = 'set json false';

      const res = vorpal.execSync(command);
      (res).should.be.equal('successfully set json output to false');
    });

    it('should be set json back to false and give feedback', () => {
      const command = 'set json false';

      const res = vorpal.execSync(command);
      (res).should.be.equal('successfully set json output to false');
    });

    it('should be set json back to false and give feedback asynchronous', (done) => {
      const command = 'set json false';

      vorpal.exec(command, (result) => {
        (result).should.be.equal('successfully set json output to false');
        done();
      });
    });
  });

  describe('switch testnet and mainnet', () => {
    it('should set testnet to true', () => {
      const command = 'set testnet true';

      const res = vorpal.execSync(command);
      (res).should.be.equal('successfully set testnet to true');
    });

    it('should set testnet to false', () => {
      const command = 'set testnet false';

      const res = vorpal.execSync(command);
      (res).should.be.equal('successfully set testnet to false');
    });
  });
});
