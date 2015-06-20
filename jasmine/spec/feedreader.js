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

        // This foreach loop will itterate over each feed in the 
        // allFeeds object and make sure each one has a non-null
        // URL defined.
        allFeeds.forEach(function(feed) {
            it('The ' + feed.name + ' url is defined and includes url string', function() {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
                expect(feed.url).toMatch(/http/);
            });
        });

        // This foreach loop will itterate over each feed in the
        // allFeeds array and make sure each one has a non-null
        // name defined.
        allFeeds.forEach(function(feed) {
            it('The name is set for' + feed.name, function() {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
                expect(feed.name).toMatch(/\w/);
            });
        });
    });

    // Testing the menu behavior with this test suite
    describe('The Menu', function() {
        // make sure the hidden menu functionality is enabled 
        // initially when page loads
        it('is hidden', function() {
            // Use JQ selector to access body and check class exists
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // make sure the menu appears when the icon is used, then
        // make sure it disapears again when it is clicked again.
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

    // This test suite will test the initial behavior of feeds
    describe('Initial Entries', function() {
         
        // Since load feeds is asyncronous make sure it finishes 
        // before analyzing.
        beforeEach(function(done) {
            // run asyncronous function with callback
            loadFeed(0, done);
        });

        // Test the loadFeed function ensuring that it produces
        // a list of links
        it('at least one entry in feed', function(done){
            // get div and count of child entry elements.
            var feedDiv = $('.feed');
            var entryCount = feedDiv.children('.entry-link').length;
            expect(entryCount).toBeGreaterThan(0);
            done();
        });
    });

    // Test suite for checking the loading of a new feeds links
    describe('New Feed Selection', function() {
        var feedDiv,
            initialFeedContent,
            currentFeedContent;

        // Run asyncronous functions with callback and capture changing
        // html content for comparison
        beforeEach(function(done) {
            feedDiv = $('.feed');

            // Empty the feed content before loading the new feed
            // content for index 0. Then store the initial content
            // of index 0 before changing it.
            feedDiv.empty();
            loadFeed(0, function() {
                initialFeedContent = feedDiv.html();
                // Now change the feed to a new index and store the
                // content of the new (current) feed links after.
                loadFeed(1, function() {
                    currentFeedContent = feedDiv.html();
                    done();
                });
            });        
        });

        // Compare initial to current after async change completes
        it('changes feed content', function(done){
            expect(initialFeedContent).not.toEqual(currentFeedContent);
            done();
        });
    });
}());

