---
title: Lesson 7 - Changing the Snakes Movement Direction
layout: default
lesson_js: lesson-7.js
---

To change the direction of the snake, we need to change the direction of
its first segment. Add the following function to snake.js:

{% highlight js %}
var changeDirection = function(direction) {
  snake[0].direction = direction;
}
{% endhighlight %}

Next, we have CHUNK call changeDirection when an arrow key is pressed.
Add the following line at the end of snake.js:

{% highlight js %}
  CHUNK.onArrowKey(changeDirection);
{% endhighlight %}

This tells CHUNK to call the `changeDirection` function every time an arrow key
is pressed.

Just like we pass our snake object into the `drawSnake` function, we can pass
the `changeDirection` function into the `onArrowKey` function.

In JavaScript, we can pass functions into functions just like we can pass
arrays, strings, integers, and objects into functions

{% include expected-results.html %}

###[Move on to Lesson 8](../lesson-8)

