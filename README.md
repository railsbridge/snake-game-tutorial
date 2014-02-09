# Snake Game Tutorial

Snake is a classic game that illustrates many programming skills. From boolean
logic to array manipulation and event-based design.

You can work through the tutorial at
[snake-tutorial.zeespencer.com](http://snake-tutorial.zeespencer.com)

## Contributing

This is very much a work in progress. Open issues for questions you have, or
submit pull requests to make things clearer.

### Setting up your Environment
This assumes you have a working ruby environment:

On OS X with homebrew installed you can run `bin/setup`

* Ensure you have s3cmd installed
* run `bundle`

### Testing Locally
* Run `bin/serve`
* Open [localhost:4000](http://localhost:4000)

### Deploying
* run `s3cmd --configure` if you haven't used s3cmd before
* Run `bin/release NAME_OF_BUCKET`
