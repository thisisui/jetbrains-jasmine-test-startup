/*
 * Just write your Jasmine tests here
 */
jasmine.getFixtures().fixturesPath = fixturesPath;

describe("We want to test some DOM", function() {

    describe('using jasmine jquery matchers', function () {
        var spyEvent;

        beforeEach(function(){
            loadFixtures('someDOM.html');
            spyEvent = spyOnEvent('#idsomething', 'click');
            $('#idsomething').click();
        });

        it("should check if something exists", function(){
            expect($('#idsomething')).toExist();
        });

        it("should check if something not exists", function(){
            expect($('#idsomethingNotExisting')).not.toExist();
        });

        it("should check if click was triggered on specific element", function(){
            expect('click').toHaveBeenTriggeredOn('#idsomething');
        });

        it("should check if click was triggered", function(){
            expect(spyEvent).toHaveBeenTriggered();
        });

    });

});

describe("Beautiful object", function () {
    var beautiful;

    beforeEach(function () {
        beautiful = new Beautiful();
    });

    describe("init function", function () {
        it("should return object", function () {
            expect(typeof beautiful.init()).toBe("object");
        });
        it("should not be null", function () {
            expect(beautiful.init()).not.toBeNull();
        });
    });

    describe("sayHello function", function () {
        it("should return greeting", function () {
            expect(beautiful.sayHello("world")).toEqual("Hello world");
        });
    });

});

describe("Sinon Fake Server With Jasmine", function () {
    var server, callbacks;

    beforeEach(function () {
        console.log('done');
        server = sinon.fakeServer.create();
        server.respondWith("GET", "/something",
            [200, { "Content-Type": "application/json" },
                '{ "stuff": "is", "awesome": "in here" }']);

        callbacks = [sinon.spy(), sinon.spy()];

        jQuery.ajax({
            url: "/something",
            success: callbacks[0]
        });

        jQuery.ajax({
            url: "/other",
            success: callbacks[1]
        });

        server.respond(); // Process all requests so far
    });

    afterEach(function () {
        server.restore();
    });

    it("should be true on first callback", function () {
        expect(callbacks[0].calledOnce).toBeTruthy();
    });

    it("should be object from data on first callback true", function () {
        expect(callbacks[0].calledWith({
            stuff: "is",
            awesome: "in here"
        })).toBeTruthy();
    });

    it("should call the callback to be false", function () {
        expect(callbacks[1].calledOnce).toBeFalsy(); // Unknown URL /other received 404
    });

});
