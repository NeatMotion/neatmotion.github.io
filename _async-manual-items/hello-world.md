---
order: 2
title : Hello World
slug : hello-world
---

Here we go. Lets make an HTTP request and log the response with WWWPromise class which uses Unity's built in WWW class internally.

{% highlight cs linenos %}
new WWWPromise("google.com")
  .Then((www)=>{
    Debug.Log(www.text);
    return www;
  });
{% endhighlight %}

{% highlight js linenos %}
new WWWPromise("google.com")
  .Then(function(www){
    Debug.Log(www.text);
    return www;
  });
{% endhighlight %}

If everything is setup correctly, you'll see the google.com's html source code logged in the console.

Now lets make another HTTP request after the first request successfully completes.

{% highlight cs linenos %}
new WWWPromise("google.com")
  .Then((www)=>{
    Debug.Log(www.text);
    return www;
  })
  .Then(new WWWPromise("yahoo.com"))
  .Then((www)=>{
    Debug.Log(www.text);
    return www;
  });
{% endhighlight %}

{% highlight js linenos %}
new WWWPromise("google.com")
  .Then(function(www){
    Debug.Log(www.text);
    return www;
  })
  .Then(new WWWPromise("yahoo.com"))
  .Then(function(www){
    Debug.Log(www.text);
    return www;
  });
{% endhighlight %}

That's the easy way of chaining async jobs with Next Async.
