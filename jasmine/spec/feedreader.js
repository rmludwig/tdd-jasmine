/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        allFeeds.forEach(function(feed) {
            //console.log(feed.name);
            //console.log(feed.url);
            it('The ' + feed.name + ' url is defined and includes url string', function() {
                expect(feed.url).toBeDefined();
                expect(feed.url).toMatch(/http/);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        allFeeds.forEach(function(feed) {
            //console.log(feed.name);
            //console.log(feed.url);
            it('The name is set for' + feed.name, function() {
                expect(feed.name).toBeDefined();
                expect(feed.name).toMatch(/\w/);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden', function() {
            // Use JQ selector to access body and check class exists
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('will change visibility when clicked', function() {
            // Use JQ to select menu icon link
            var link = $('.menu-icon-link');
            // Simulate clicking of link, menu hidden should be toggled
            link.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            // Simulate clicking again, menu hidden should be toggled again
            link.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            // run asyncronous function with callback
            loadFeed(0, function() {
                done();
            });
        });

        it('at least one entry in feed', function(done){
            // get div and count of child entry elements.
            var feedDiv = $('.feed');
            var entryCount = feedDiv.children('.entry-link').length;
            //console.log('count ' + entryCount);
            expect(entryCount).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        // Store inner html of feed container in these vars
        var initialFeedContent = $('.feed').html();

        // run asyncronous functions with callback and capture changing
        // html content for comparison
        beforeEach(function(done) {
            // load feed index 1, this is a change to initial content
            loadFeed(1, function() {
                done();
            });
        });

        // Compare initial to current after async change completes
        it('changes feed content', function(done){
            // capture new content
            var currentFeedContent = $('.feed').html();
            // initial and new should not be the same
            //console.log(initialFeedContent);
            //console.log('new');
            //console.log(currentFeedContent);
            expect(initialFeedContent).not.toEqual(currentFeedContent);
            done();
        });
    });
}());

