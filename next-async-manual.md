---
layout : manual
title : Next Async User's Manual
product : NextAsync 0.5.0
---
* TOC
{:toc}

# Getting Started

### Overview
Next Async is a library that makes it easier to deal with asynchronous jobs in Unity. This guide will help you to get started with NextAsync in a few minutes. If you have any problems or questions feel free to write to the [topic at Unity Community Forums](#).

### Installation
Just grab and import the latest version from [Unity Asset Store](#) for free. After the import process completed, you can find the source code at folder Plugins/Next/Async .

---

# Usage

### Hello World
Here we go. Lets send an HTTP request and log the response with WWWPromise class which uses Unity's built in WWW class internally. A WWWPromise produces a result of the type WWW. If everything is setup correctly, you'll see the google.com's html source code logged in the console.

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

### Chaining Jobs
Now lets send another HTTP request after the first request successfully completed by using Then() method. The heart of js-promises pattern and Next Async.

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

### Catching Exceptions
When things go wrong in any of the chained jobs, you can catch all exceptions with a single catch clause by using Catch() method.

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
  })
  .Catch((e)=>{
      Debug.LogException(e);
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
  })
  .Catch((e)=>{
      Debug.LogException(e);
  });
{% endhighlight %}

### Timeouts
You can easily set timeout for jobs with SetTimeout() method. If total time taken since start of the job exceeds the timeout duration, the promise will be automatically rejected. In the following example if we can't get a response from google.com within 2 seconds, then our promise will fail and we wont send a request to yahoo.com .

{% highlight cs linenos %}
new WWWPromise("google.com")
  .Then((www)=>{
    Debug.Log(www.text);
    return www;
  })
  .SetTimeout(2)
  .Then(new WWWPromise("yahoo.com"))
  .Then((www)=>{
    Debug.Log(www.text);
    return www;
  })
  .Catch((e)=>{
      Debug.LogException(e);
  });
{% endhighlight %}

{% highlight js linenos %}
new WWWPromise("google.com")
  .Then(function(www){
    Debug.Log(www.text);
    return www;
  })
  .SetTimeout(2)
  .Then(new WWWPromise("yahoo.com"))
  .Then(function(www){
    Debug.Log(www.text);
    return www;
  })
  .Catch((e)=>{
      Debug.LogException(e);
  });
{% endhighlight %}

### Progress
You can get feedback about the job's progress by using OnProgress() method. The following code will only report progress about the request to yahoo.com .

{% highlight cs linenos %}
new WWWPromise("google.com")
  .Then((www)=>{
    Debug.Log(www.text);
    return www;
  })
  .SetTimeout(2)
  .Then(new WWWPromise("yahoo.com"))
  .Then((www)=>{
    Debug.Log(www.text);
    return www;
  })
  .OnProgress((progress) => {
    Debug.Log("Progress : "+progress)
  })
  .Catch((e)=>{
      Debug.LogException(e);
  });
{% endhighlight %}

{% highlight js linenos %}
new WWWPromise("google.com")
  .Then(function(www){
    Debug.Log(www.text);
    return www;
  })
  .SetTimeout(2)
  .Then(new WWWPromise("yahoo.com"))
  .Then(function(www){
    Debug.Log(www.text);
    return www;
  })
  .OnProgress((progress) => {
    Debug.Log("Progress : "+progress)
  })
  .Catch((e)=>{
      Debug.LogException(e);
  });
{% endhighlight %}

### Chain Progress
You can also get info about the whole chain's progress easily by using OnChainProgress() method.

{% highlight cs linenos %}
new WWWPromise("google.com")
  .Then((www)=>{
    Debug.Log(www.text);
    return www;
  })
  .SetTimeout(2)
  .Then(new WWWPromise("yahoo.com"))
  .Then((www)=>{
    Debug.Log(www.text);
    return www;
  })
  .OnChainProgress((progress) => {
    Debug.Log("Progress : "+progress)
  })
  .Catch((e)=>{
      Debug.LogException(e);
  });
{% endhighlight %}

{% highlight js linenos %}
new WWWPromise("google.com")
  .Then(function(www){
    Debug.Log(www.text);
    return www;
  })
  .SetTimeout(2)
  .Then(new WWWPromise("yahoo.com"))
  .Then(function(www){
    Debug.Log(www.text);
    return www;
  })
  .OnChainProgress((progress) => {
    Debug.Log("Progress : "+progress)
  })
  .Catch((e)=>{
      Debug.LogException(e);
  });
{% endhighlight %}

### Waiting
Sometimes you have to delay some job intentionally. You can use WaitFor() method for that purpose. In the following example, we'll send a request to yahoo.com with 1 second delay after the request to google.com succeeded.

{% highlight cs linenos %}
new WWWPromise("google.com")
  .Then((www)=>{
    Debug.Log(www.text);
    return www;
  })
  .SetTimeout(2)
  .WaitFor(1)
  .Then(new WWWPromise("yahoo.com"))
  .Then((www)=>{
    Debug.Log(www.text);
    return www;
  })
  .OnChainProgress((progress) => {
    Debug.Log("Progress : "+progress)
  })
  .Catch((e)=>{
      Debug.LogException(e);
  });
{% endhighlight %}

{% highlight js linenos %}
new WWWPromise("google.com")
  .Then(function(www){
    Debug.Log(www.text);
    return www;
  })
  .SetTimeout(2)
  .WaitFor(1)
  .Then(new WWWPromise("yahoo.com"))
  .Then(function(www){
    Debug.Log(www.text);
    return www;
  })
  .OnChainProgress((progress) => {
    Debug.Log("Progress : "+progress)
  })
  .Catch((e)=>{
      Debug.LogException(e);
  });
{% endhighlight %}

---

# Built-in Types
There are some very useful ready-to-use classes that enables defining jobs easily.

### Direct Jobs
Sometimes you may need to execute raw code between two jobs in a chain. Or you may need to convert the result of the previous job to make it compatible with the next job. That's where direct jobs comes handy. You can define a job from Action, Action<T>, Func<T>, Func<T, S> . Here's an example :

//TODO

### Threaded Jobs


### Coroutine Jobs

### Parallel Jobs

### Race Jobs

---

# Custom Jobs

# Advanced Topics

### SwitchToUnityThread
