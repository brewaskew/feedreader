/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('all feeds have a url', function () {
            for (let feed in allFeeds) {
                expect(allFeeds[feed].url).toBeDefined();
                expect(allFeeds[feed].url.length).toBeGreaterThan(0);
            }
        });

        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('all feeds have a name', function () {
            for (let feed in allFeeds) {
                expect(allFeeds[feed].name).toBeDefined();
                expect(allFeeds[feed].name.length).toBeGreaterThan(0);
            }
        });

    });

    /* Write a new test suite named "The menu" */
    describe('The menu', function () {

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu is hidden by default', function () {
            let test = $('body').hasClass('menu-hidden');
            expect(test).toBe(true);
        });

        /* Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu changes state when menu icon clicked', function () {
            const menuButton = $('.menu-icon-link');            
            let test = $('body').hasClass('menu-hidden');

            expect(test).toBe(true);
            menuButton.click();
            test = $('body').hasClass('menu-hidden');
            expect(test).toBe(false);
            menuButton.click();
            test = $('body').hasClass('menu-hidden');
            expect(test).toBe(true);
        });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        const id = 0;
        
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('feed has at least one entry', function (done) {
            const feed = document.getElementsByClassName('feed');

            expect(feed["0"].children["0"].children["0"].className).toBe('entry');
            done();
        });
    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        let feed, feed1Text, feed2Text;

        beforeEach(function (done) {
            loadFeed(0, function () {
                feed = document.getElementsByClassName('feed');
                feed1Text = feed["0"].innerText;

                loadFeed(1, function () {
                    feed = document.getElementsByClassName('feed');
                    feed2Text = feed["0"].innerText;
                    done();
                });
            });
        });

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('feed changes when a new feed is loaded', function (done) {
            expect(feed1Text).not.toBe(feed2Text);
            done();
        });
    });
}());
