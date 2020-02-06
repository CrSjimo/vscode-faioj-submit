import { searchProblem, submitCode, getContests, getContestProblemList } from "../lib/submit";
import { parseContestPagesAmount, parseContestList, parseContestProblemList, parseContestProblemSubmitPath } from "../lib/xml_parsers";
(async ()=>{
  console.log(await parseContestProblemSubmitPath(`




  <!DOCTYPE html>
  <html lang="zh-CN" style="position: fixed; width: 100%; overflow: hidden; ">
  <head>
      <meta charset="utf-8">
      <meta content="IE=edge" http-equiv="X-UA-Compatible">
      <meta name="viewport" content="width=1200">
      <title>L. 部落卫队 - 搜索例题习题 - 比赛 - FAIOJ</title>
      <link href="https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/cdnjs/semantic-ui/2.4.1/semantic.min.css" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/self/tomorrow.css" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/self/math.css" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/self/style.css?20181212" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/cdnjs/morris.js/0.5.1/morris.css" rel="stylesheet">
      
        <link href="https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/google-fonts/fira-mono.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/google-fonts/lato.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/google-fonts/open-sans.css" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/google-fonts/exo-2.css" rel="stylesheet">
      
      <script src="https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/cdnjs/jquery/3.3.1/jquery.min.js"></script>
      
  </head>
  <body style="position: relative; margin-top: 49px; height: calc(100% - 49px); overflow-y: overlay; ">
      <div class="ui fixed borderless menu" style="position: fixed; height: 49px; ">
          <div class="ui container">
              
              <a class="header item" href="/"><span style="font-family: 'Exo 2'; font-size: 1.5em; font-weight: 600; ">FAIOJ</span></a>
              
              <a class="item" href="/"><i class="home icon"></i> 首页</a>
              <a class="item" href="/problems"><i class="list icon"></i> 题库</a>
              <a class="item active" href="/contests"><i class="calendar icon"></i> 比赛</a>
              <a class="item" href="/submissions"><i class="tasks icon"></i> 评测</a>
              <a class="item" href="/ranklist"><i class="signal icon"></i> 排名</a>
              <a class="item" href="/discussion/global"><i class="comments icon"></i> 讨论</a>
              <a class="item" href="/help"><i class="help circle icon"></i> 帮助</a>
              
                <a id="back_to_contest" class="item" href="/contest/65"><i class="arrow left icon"></i> 返回比赛</a>
              
              <div class="right menu">
                
                <a href="/user/412" style="color: inherit; ">
                <div class="ui simple dropdown item">
                  李星烨<a class="ui mini yellow label" style="margin-left: 5px;">2019</a> <i class="dropdown icon"></i>
                  <div class="menu">
                    <a class="item" href="/user/412/edit"><i class="edit icon"></i>修改资料</a>
                    
                    <a class="item" href-post="/logout?url=%2Fcontest%2F65%2Fproblem%2F12"><i class="power icon"></i>注销</a>
                  </div>
                </div>
                </a>
                  
              </div>
          </div>
      </div>
      <div style="margin-top: 28px; ">
      <div class="ui main container">
  
  <style>
  #languages-menu::-webkit-scrollbar, #testcase-menu::-webkit-scrollbar {
      width: 0px;
      background: transparent;
  }
  
  #languages-menu .item::after, #testcase-menu .item::after {
      display: none;
  }
  </style>
  
  <script>
    window.pathLib = "https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/cdnjs/";
    window.pathSelfLib = "https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/self/";
    
    var originalConsoleWarn = console.warn;
    console.warn = function (message) {
      if (message.startsWith('Duplicate definition of module')) return;
      originalConsoleWarn.apply(console, arguments);
    };
  </script>
  
  <!-- Load monaco-editor -->
  <script src="https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/cdnjs/monaco-editor/0.16.2/min/vs/loader.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/self/monaco-editor.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/self/monaco-editor.css">
  
  
  
  
  <div class="ui center aligned grid">
      <div class="row">
        <h1 class="ui header">
          
            L. 部落卫队
          
        </h1>
      </div>
      
        <div class="row" style="margin-top: -15px">
            <span class="ui label">内存限制：256 MiB</span>
            <span class="ui label">时间限制：1000 ms</span>
            
              <span class="ui label">标准输入输出</span>
            
        </div>
      
      
        <div class="row" style="margin-top: -23px">
            <span class="ui label">题目类型：传统</span>
            <span class="ui label">评测方式：文本比较</span>
        </div>
      
      
  </div>
  <div class="ui grid">
    <div class="row">
      <div class="column">
        <div class="ui buttons">
          
            
              <a class="small ui primary button" href="#submit_code">提交</a>
            
            <a class="small ui positive button" href="/contest/65/submissions?problem_id=12">提交记录</a>
            
            <a href="/contest/65" class="ui orange button">返回比赛</a>
          
        </div>
        
      </div>
    </div>
    
    <div class="row">
      <div class="column">
        <h4 class="ui top attached block header">题目描述</h4>
        <div class="ui bottom attached segment font-content"><div style="position: relative; overflow: hidden; "><p>原始部落byteland中的居民们为了争夺有限的资源，经常发生冲突。几乎每个居民都有他的仇敌。部落酋长为了组织一支保卫部落的队伍，希望从部落的居民中选出最多的居民入伍，并保证队伍中任何2 个人都不是仇敌。
  【编程任务】
  给定byteland部落中居民间的仇敌关系，编程计算组成部落卫队的最佳方案。</p>
  </div></div>
      </div>
    </div>
    
    
    <div class="row">
      <div class="column">
          <h4 class="ui top attached block header">输入格式</h4>
          <div class="ui bottom attached segment font-content"><div style="position: relative; overflow: hidden; "><p>第1行有2个正整数n和m，表示byteland部落中有n个居民，居民间有m个仇敌关系。居民编号为1，2，…，n。接下来的m行中，每行有2个正整数u和v，表示居民u与居民v是仇敌。</p>
  </div></div>
      </div>
    </div>
    
    
      <div class="row">
          <div class="column">
            <h4 class="ui top attached block header">输出格式</h4>
            <div class="ui bottom attached segment font-content"><div style="position: relative; overflow: hidden; "><p>第1行是部落卫队的顶人数；文件的第2行是卫队组成x i，1≤i≤n，xi =0 表示居民i不在卫队中，xi=1表示居民i在卫队中。</p>
  </div></div>
          </div>
      </div>
    
    
      <div class="row">
          <div class="column">
            <h4 class="ui top attached block header">样例</h4>
            <div class="ui bottom attached segment font-content"><div style="position: relative; overflow: hidden; "><div class="ui existing segment"><pre style="margin-top: 0; margin-bottom: 0; "><code>Sample Input  
  7  10
  1  2
  1  4
  2  4
  2  3
  2  5
  2  6
  3  5
  3  6
  4  5
  5  6
  </code></pre></div>
  <div class="ui existing segment"><pre style="margin-top: 0; margin-bottom: 0; "><code>Sample Output  
  3
  1 0 1 0 0 0 1
  </code></pre></div>
  </div></div>
          </div>
      </div>
    
    
      <div class="row">
          <div class="column">
            <h4 class="ui top attached block header">数据范围与提示</h4>
            <div class="ui bottom attached segment font-content"><div style="position: relative; overflow: hidden; "><p>n &lt; = 200 ,m&lt; = 5000</p>
  </div></div>
          </div>
      </div>
    
    
      
      
      
      <div class="row">
          <div class="column">
            
            <form action="/problem/1223/submit?contest_id=65" method="post" onsubmit="return submit_code()" id="submit_code" enctype="multipart/form-data">
              
                <input name="language" type="hidden" id="form">
                <input name="code" type="hidden">
                <div class="ui grid">
                  <div class="four wide column" style="margin-right: -25px; ">
                    <div class="ui attached vertical fluid pointing menu" id="languages-menu" style="height: 370px; overflow-y: scroll; overflow-x: hidden; ">
                      
                      
                        <a style="border-radius: 0; " class="item" data-value="cpp" data-mode="cpp">
                          C++
                          <div class="ui right floated" style="opacity: 0.4; margin-top: 8px; font-size: 0.7em; ">GCC 8.2.0</div>
                        </a>
                      
                        <a style="border-radius: 0; " class="item" data-value="cpp11" data-mode="cpp">
                          C++ 11
                          <div class="ui right floated" style="opacity: 0.4; margin-top: 8px; font-size: 0.7em; ">GCC 8.2.0</div>
                        </a>
                      
                        <a style="border-radius: 0; " class="item active" data-value="cpp-noilinux" data-mode="cpp">
                          C++ (NOI)
                          <div class="ui right floated" style="opacity: 0.4; margin-top: 8px; font-size: 0.7em; ">GCC 4.8.4 (NOILinux 1.4.1)</div>
                        </a>
                      
                        <a style="border-radius: 0; " class="item" data-value="cpp11-noilinux" data-mode="cpp">
                          C++ 11 (NOI)
                          <div class="ui right floated" style="opacity: 0.4; margin-top: 8px; font-size: 0.7em; ">GCC 4.8.4 (NOILinux 1.4.1)</div>
                        </a>
                      
                    </div>
                  </div>
                  <div class="twelve wide stretched column" style="position: relative; padding-left: 0; margin-left: calc(-1rem - 1px); width: calc(75% + 1rem + 13px) !important; ">
                    <div id="editor" style="position: absolute; width: 100%; height: calc(100% - 28px); border: 1px solid #D4D4D5; overflow: hidden; " class="editor">
                      
  <div class="ui active medium text loader">编辑器加载中 …</div>
  
                    </div>
                  </div>
                  <div class="ui form" style="width: 100%; ">
                    <div class="inline fields" style="width: 100%; ">
                      <div class="field" style="margin: 0 auto; ">
                        <label for="answer">或者，上传代码文件</label>
                        <input type="file" id="answer" name="answer">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ui center aligned vertical segment" style="padding-bottom: 0; ">
                  <button type="submit" class="ui labeled icon button"><i class="ui edit icon"></i>提交</button>
                </div>
              
            </form>
          </div>
      </div>
      
  </div>
  
  
  <script type="text/javascript">
    var editor;
    window.onEditorLoaded(function () {
      var editorElement = document.getElementById('editor');
      var content = '';
      
      editor = window.createCodeEditor(editorElement, $('#languages-menu .item.active').data('mode'), content);
      window.editor = editor;
    });
  
    var lastSubmitted = '';
  
    function submit_code() {
      if (!$('#submit_code input[name=answer]').val().trim() && !editor.getValue().trim()) return false;
      $('#submit_code input[name=language]').val($('#languages-menu .item.active').data('value'));
      lastSubmitted = editor.getValue();
      $('#submit_code input[name=code]').val(editor.getValue());
      return true;
    }
  
    $('#languages-menu')[0].scrollTop = $('#languages-menu .active')[0].offsetTop - $('#languages-menu')[0].firstElementChild.offsetTop;
  
    $(function () {
      $('#languages-menu .item').click(function() {
        $(this)
          .addClass('active')
          .closest('.ui.menu')
          .find('.item')
            .not($(this))
            .removeClass('active')
        ;
        monaco.editor.setModelLanguage(editor.getModel(), $(this).data('mode'));
      });
    });
  </script>
  
  
  </div>
      <div class="ui vertical footer segment" style="margin-top: 15px; ">
        <div class="ui center aligned container">
          <span style="color: #999;">FAIOJ Powered by <a href="https://github.com/syzoj/syzoj" target="_blank">SYZOJ</a>.</span>
        </div>
      </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/cdnjs/semantic-ui/2.4.1/semantic.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/cdnjs/Chart.js/2.7.3/Chart.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/syzoj-public-cdn@1.0.5/self/script.js?20170710"></script>
  </body>
  </html>
  
  `));
})()
