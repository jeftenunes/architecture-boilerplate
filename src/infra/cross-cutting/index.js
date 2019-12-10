const { asClass, createContainer } = require('awilix');
const TestService = require('../../application/services/test-service');

const container = createContainer()
    .register({ 
        testService: asClass(TestService).scoped()
    }
);

module.exports = container;