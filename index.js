$(document).ready(function(){
var key=`AIzaSyBytqNX42UqmJjz9xQq6TozQzV3IUJIRVA`;
var playlist=`PLFquzbp0Cb17W7rBmhWWL1OhphmKld9iW`;
var url=`https://www.googleapis.com/youtube/v3/playlistItems`;
var options={
	part:"snippet",
	key:key,
	playlistId:playlist,
	maxResults:20
}
	loadvids();

function loadvids(){
	$.getJSON(url,options,function(data){
		console.log(data)
		var id=data.items[6].snippet.resourceId.videoId;
		mainvid(id);
		loop(data);
	})
}
function mainvid(id){
	$(`section`).html(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
}
function loop(data){
	$.each(data.items,function(i,item){
	var thumb=item.snippet.thumbnails.medium.url;
	var Title=item.snippet.title;
	var des=item.snippet.description.substring(0,100);
	var vid=item.snippet.resourceId.videoId;

	$(`main`).append(`<div class="aa" data-key="${vid}">
		<div><img src="${thumb}" class="thumb"></div>
		<div class="details">
			<h4 class="style">${Title}</h4>
			<p>${des}</p>
		</div>
	</div>`);

	})
}
$('main').on('click','.aa',function(){
	var id=$(this).attr('data-key');
	mainvid(id);
	
})
});