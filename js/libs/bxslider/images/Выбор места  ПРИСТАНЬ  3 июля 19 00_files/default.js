$(function()
{
//    if ($('.messages-box').length)
//    {
//        var hide_messages = function()
//        {
//            $('.messages-box').hide(500);
//        }
//
//        setTimeout(hide_messages, 2000);
//    }
})

$(function()
{
    $('a').focus(function()
    {
        $(this).blur();
    });
})

function initPaginator(object_id, pages_count, page, callback)
{
    if (callback == undefined)
    {
        callback = paginatorRedirect;
    }

    var params = {
        count 		        : pages_count,
        start 		        : page,
        display                 : 31,
        border			: false,
        text_color  		: '#888',
        background_color    	: '#EEE',
        text_hover_color  	: 'black',
        background_hover_color	: '#CFCFCF',
        onChange                : function(page) {
            callback(page)
        }
    };

    $("#" + object_id).paginate(params);
}


function paginatorRedirect(page)
{
    var url = location.href;

    if (url.indexOf("page") == -1)
    {
        url+= "/page/" + page;
    }
    else
    {
        var page_url = /page\/[0-9]+/.exec(url);

        url = url.replace(page_url, "page/" + page)
    }

    location.href = url;
}


function trim(str, chars)
{
    return ltrim(rtrim(str, chars), chars);
}


function ltrim(str, chars)
{
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}


function rtrim(str, chars)
{
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}


function showLoader()
{
    $("html").mask("Подождите пожалуйста...");
}


function hideLoader()
{
    $("html").unmask();
}


function showMsg(msg, delay)
{
    delay = delay == undefined ? 2500 : delay;

    var options = {
        id: 'message_from_top',
        position: 'top',
        size: 50,
        backgroundColor: '#2488A6',
        delay: delay,
        speed: 500,
        fontSize: '20px',
        style: 'color:red'
    };

    $.showMessage(msg, options);
}




function initMulticheckbox(parent_ident)
{
    $('.multi_checkbox', $(parent_ident)).click(function()
    {
        $('input[type=checkbox]', $(parent_ident)).each(function()
        {
            if (!$(this).is('.multi_checkbox'))
            {
                this.checked = !this.checked;
            }
        });
    });
}


function initActionsSelect(form_ident)
{
    $('.actions_select', $(form_ident)).each(function()
    {
        this.onchange = function()
        {
            if (this.value)
            {
                if (confirm('Вы уверены, что хотите продолжить?'))
                {
                    $(form_ident).attr('action', this.value).submit();
                }
                else
                {
                    this.value = "";
                }
            }
        }
    });
}


function deleteRecord(url)
{
    if (confirm('Удалить элемент?'))
    {
        document.location.href = url;
    }
}



function setcookie(name,value,expire){
  var exp=new Date();
  var cookieexpire=exp.getTime()+expire;
  exp.setTime(cookieexpire);
  document.cookie=name+"="+value+";expires="+exp.toGMTString()+';path=/';
}

//функция возвращает значение для cookie по имени name
function getcookie(Name){
  var search=Name+"=";
  if(document.cookie.length>0){ //если cookie существует
    offset=document.cookie.indexOf(search)
    if(offset!=-1){ //если существует cookie по имени name
      offset+=search.length //начало нужного cookie
      end=document.cookie.indexOf(";",offset) //конец нужного cookie
      if(end==-1){end=document.cookie.length}
      return unescape(document.cookie.substring(offset, end))
    }
  }
}