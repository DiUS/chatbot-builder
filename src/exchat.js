const { intentModule, botModule } = require('./modules');

const exchat = (function() {
  return {
    intent: intentModule,
    bot: botModule
  };
})();

module.exports = exchat;