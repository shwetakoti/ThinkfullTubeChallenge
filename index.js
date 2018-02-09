const youtube_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function watchSubmit()
{
  $('.js-search-form').submit(event =>
  {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    const settings =
    {
    	url: youtube_SEARCH_URL,
      data: {
              q: `${query} in:name`,
              maxResults: 3,
              part: 'snippet',
              key: 'AIzaSyBVrXyIeQifSFKXjscwA27m2couzd2XNSc',
            },
      dataType: 'json',
      type: 'GET',
      success: function(data)
       {
          console.log(data.nextPageToken);
          console.log(data.prevPageToken);
          var nextToken = data.nextPageToken;
          var prevToken = data.prevPageToken;
           $.each(data.items,function(i,item)
           {
            //console.log(i);
           //console.log(item.snippet.thumbnails.medium.url);
            console.log(data);
           //console.log(item.id.videoId);
            $('.js-search-results').append(
             `<ul>
                <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank" ><img src = "${item.snippet.thumbnails.medium.url}" target="_blank"></a>
              </ul>`)

           }) //.each

          // the buttons-'next' or 'previous'
          if(!prevToken)
          {
            console.log('I am here in if');
            console.log(data.nextPageToken);
            $('.js-buttons').html(`<button class="js-next" id="next" type="submit" data-token="${data.nextPageToken}">Next</button>`)
          }
          else
          {
            console.log('I am here in else');
            $('.js-buttons').html(`<button class="js-prev" id="prev" type="submit" data-token="${data.prevPageToken}">previous</button>
                                     <button class="js-next" id="next" type="submit" data-token="${data.nextPageToken}">Next</button>`);
          }

          //display results when user clicks next button
          $('.js-next').on('click',function(event)
          {
            event.preventDefault();
            console.log('I am in event');
            var token = $('#next').data('token');
            console.log(token);
            const settings =
            {
              url: youtube_SEARCH_URL,
              data: {
                      q: `${query} in:name`,
                      maxResults: 3,
                      part: 'snippet',
                      pageToken:token,
                      key: 'AIzaSyBVrXyIeQifSFKXjscwA27m2couzd2XNSc',
                    },
              dataType: 'json',
              type: 'GET',
              success: function(data)
               {
                   $.each(data.items,function(i,item)
                   {

                    $('.js-search-results').append(
                     `<ul>
                        <a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank" ><img src = "${item.snippet.thumbnails.medium.url}" target="_blank"></a>
                      </ul>`)

                   })
               } //inner success
            } //settings
            $.ajax(settings);
          }) //event

       } //outer success

    } //outer settings
    $.ajax(settings);
  }); //outer-submit event
} //function watchSubmit

$(watchSubmit);
