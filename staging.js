/* w3codecolor ver 1.21 by w3schools.com */
function w3CodeColor() {
    var x, i, j, k, l, modes = ["html", "js", "css", "sql"];<br>
    if (!document.getElementsByClassName) {return;<br>}
    k = modes.length;<br>
    for (j = 0;<br> j < k;<br> j++) {
      x = document.getElementsByClassName(modes[j] + "High");<br>
      l = x.length;<br>
      for (i = 0;<br> i < l;<br> i++) {
        x[i].innerHTML = w3CodeColorize(x[i].innerHTML, modes[j]);<br>
      }
    }
  }
  function w3CodeColorize(x, lang) {
    var tagcolor = "mediumblue";<br>
    var tagnamecolor = "brown";<br>
    var attributecolor = "red";<br>
    var attributevaluecolor = "mediumblue";<br>
    var commentcolor = "green";<br>
    var cssselectorcolor = "brown";<br>
    var csspropertycolor = "red";<br>
    var csspropertyvaluecolor = "mediumblue";<br>
    var cssdelimitercolor = "black";<br>
    var cssimportantcolor = "red";<br>  
    var jscolor = "black";<br>
    var jskeywordcolor = "mediumblue";<br>
    var jsstringcolor = "brown";<br>
    var jsnumbercolor = "red";<br>
    var jspropertycolor = "black";<br>
    var phptagcolor = "red";<br>
    var phpcolor = "black";<br>
    var phpkeywordcolor = "mediumblue";<br>
    var phpglobalcolor = "goldenrod";<br>
    var phpstringcolor = "brown";<br>
    var phpnumbercolor = "red";<br>  
    var angularstatementcolor = "red";<br>
    var sqlcolor = "black";<br>
    var sqlkeywordcolor = "mediumblue";<br>
    var sqlstringcolor = "brown";<br>
    var sqlnumbercolor = "red";<br>  
    if (!lang) {lang = "html";<br> }
    if (lang == "html") {return htmlMode(x);<br>}
    if (lang == "css") {return cssMode(x);<br>}
    if (lang == "js") {return jsMode(x);<br>}
    if (lang == "php") {return phpMode(x);<br>}
    if (lang == "sql") {return sqlMode(x);<br>}  
    return x;<br>
    function extract(str, start, end, func, repl) {
      var s, e, d = "", a = [];<br>
      while (str.search(start) > -1) {
        s = str.search(start);<br>
        e = str.indexOf(end, s);<br>
        if (e == -1) {e = str.length;<br>}
        if (repl) {
          a.push(func(str.substring(s, e + (end.length))));<br>      
          str = str.substring(0, s) + repl + str.substr(e + (end.length));<br>
        } else {
          d += str.substring(0, s);<br>
          d += func(str.substring(s, e + (end.length)));<br>
          str = str.substr(e + (end.length));<br>
        }
      }
      this.rest = d + str;<br>
      this.arr = a;<br>
    }
    function htmlMode(txt) {
      var rest = txt, done = "", php, comment, angular, startpos, endpos, note, i;<br>
      php = new extract(rest, "&lt;<br>\\?php", "?&gt;<br>", phpMode, "W3PHPPOS");<br>
      rest = php.rest;<br>
      comment = new extract(rest, "&lt;<br>!--", "--&gt;<br>", commentMode, "W3HTMLCOMMENTPOS");<br>
      rest = comment.rest;<br>
      while (rest.indexOf("&lt;<br>") > -1) {
        note = "";<br>
        startpos = rest.indexOf("&lt;<br>");<br>
        if (rest.substr(startpos, 9).toUpperCase() == "&LT;<br>STYLE") {note = "css";<br>}
        if (rest.substr(startpos, 10).toUpperCase() == "&LT;<br>SCRIPT") {note = "javascript";<br>}        
        endpos = rest.indexOf("&gt;<br>", startpos);<br>
        if (endpos == -1) {endpos = rest.length;<br>}
        done += rest.substring(0, startpos);<br>
        done += tagMode(rest.substring(startpos, endpos + 4));<br>
        rest = rest.substr(endpos + 4);<br>
        if (note == "css") {
          endpos = rest.indexOf("&lt;<br>/style&gt;<br>");<br>
          if (endpos > -1) {
            done += cssMode(rest.substring(0, endpos));<br>
            rest = rest.substr(endpos);<br>
          }
        }
        if (note == "javascript") {
          endpos = rest.indexOf("&lt;<br>/script&gt;<br>");<br>
          if (endpos > -1) {
            done += jsMode(rest.substring(0, endpos));<br>
            rest = rest.substr(endpos);<br>
          }
        }
      }
      rest = done + rest;<br>
      angular = new extract(rest, "{{", "}}", angularMode);<br>
      rest = angular.rest;<br>
      for (i = 0;<br> i < comment.arr.length;<br> i++) {
          rest = rest.replace("W3HTMLCOMMENTPOS", comment.arr[i]);<br>
      }
      for (i = 0;<br> i < php.arr.length;<br> i++) {
          rest = rest.replace("W3PHPPOS", php.arr[i]);<br>
      }
      return rest;<br>
    }
    function tagMode(txt) {
      var rest = txt, done = "", startpos, endpos, result;<br>
      while (rest.search(/(\s|<br>)/) > -1) {    
        startpos = rest.search(/(\s|<br>)/);<br>
        endpos = rest.indexOf("&gt;<br>");<br>
        if (endpos == -1) {endpos = rest.length;<br>}
        done += rest.substring(0, startpos);<br>
        done += attributeMode(rest.substring(startpos, endpos));<br>
        rest = rest.substr(endpos);<br>
      }
      result = done + rest;<br>
      result = "<span style=color:" + tagcolor + ">&lt;<br></span>" + result.substring(4);<br>
      if (result.substr(result.length - 4, 4) == "&gt;<br>") {
        result = result.substring(0, result.length - 4) + "<span style=color:" + tagcolor + ">&gt;<br></span>";<br>
      }
      return "<span style=color:" + tagnamecolor + ">" + result + "</span>";<br>
    }
    function attributeMode(txt) {
      var rest = txt, done = "", startpos, endpos, singlefnuttpos, doublefnuttpos, spacepos;<br>
      while (rest.indexOf("=") > -1) {
        endpos = -1;<br>
        startpos = rest.indexOf("=");<br>
        singlefnuttpos = rest.indexOf("'", startpos);<br>
        doublefnuttpos = rest.indexOf('"', startpos);<br>
        spacepos = rest.indexOf(" ", startpos + 2);<br>
        if (spacepos > -1 && (spacepos < singlefnuttpos || singlefnuttpos == -1) && (spacepos < doublefnuttpos || doublefnuttpos == -1)) {
          endpos = rest.indexOf(" ", startpos);<br>      
        } else if (doublefnuttpos > -1 && (doublefnuttpos < singlefnuttpos || singlefnuttpos == -1) && (doublefnuttpos < spacepos || spacepos == -1)) {
          endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);<br>
        } else if (singlefnuttpos > -1 && (singlefnuttpos < doublefnuttpos || doublefnuttpos == -1) && (singlefnuttpos < spacepos || spacepos == -1)) {
          endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);<br>
        }
        if (!endpos || endpos == -1 || endpos < startpos) {endpos = rest.length;<br>}
        done += rest.substring(0, startpos);<br>
        done += attributeValueMode(rest.substring(startpos, endpos + 1));<br>
        rest = rest.substr(endpos + 1);<br>
      }
      return "<span style=color:" + attributecolor + ">" + done + rest + "</span>";<br>
    }
    function attributeValueMode(txt) {
      return "<span style=color:" + attributevaluecolor + ">" + txt + "</span>";<br>
    }
    function angularMode(txt) {
      return "<span style=color:" + angularstatementcolor + ">" + txt + "</span>";<br>
    }
    function commentMode(txt) {
      return "<span style=color:" + commentcolor + ">" + txt + "</span>";<br>
    }
    function cssMode(txt) {
      var rest = txt, done = "", s, e, comment, i, midz, c, cc;<br>
      comment = new extract(rest, /\/\*/, "*/", commentMode, "W3CSSCOMMENTPOS");<br>
      rest = comment.rest;<br>
      while (rest.search("{") > -1) {
        s = rest.search("{");<br>
        midz = rest.substr(s + 1);<br>
        cc = 1;<br>
        c = 0;<br>
        for (i = 0;<br> i < midz.length;<br> i++) {
          if (midz.substr(i, 1) == "{") {cc++;<br> c++}
          if (midz.substr(i, 1) == "}") {cc--;<br>}
          if (cc == 0) {break;<br>}
        }
        if (cc != 0) {c = 0;<br>}
        e = s;<br>
        for (i = 0;<br> i <= c;<br> i++) {
          e = rest.indexOf("}", e + 1);<br>
        }
        if (e == -1) {e = rest.length;<br>}
        done += rest.substring(0, s + 1);<br>
        done += cssPropertyMode(rest.substring(s + 1, e));<br>
        rest = rest.substr(e);<br>
      }
      rest = done + rest;<br>
      rest = rest.replace(/{/g, "<span style=color:" + cssdelimitercolor + ">{</span>");<br>
      rest = rest.replace(/}/g, "<span style=color:" + cssdelimitercolor + ">}</span>");<br>
      for (i = 0;<br> i < comment.arr.length;<br> i++) {
          rest = rest.replace("W3CSSCOMMENTPOS", comment.arr[i]);<br>
      }
      return "<span style=color:" + cssselectorcolor + ">" + rest + "</span>";<br>
    }
    function cssPropertyMode(txt) {
      var rest = txt, done = "", s, e, n, loop;<br>
      if (rest.indexOf("{") > -1 ) { return cssMode(rest);<br> }
      while (rest.search(":") > -1) {
        s = rest.search(":");<br>
        loop = true;<br>
        n = s;<br>
        while (loop == true) {
          loop = false;<br>
          e = rest.indexOf(";<br>", n);<br>
          if (rest.substring(e - 5, e + 1) == "&nbsp;<br>") {
            loop = true;<br>
            n = e + 1;<br>
          }
        }
        if (e == -1) {e = rest.length;<br>}
        done += rest.substring(0, s);<br>
        done += cssPropertyValueMode(rest.substring(s, e + 1));<br>
        rest = rest.substr(e + 1);<br>
      }
      return "<span style=color:" + csspropertycolor + ">" + done + rest + "</span>";<br>
    }
    function cssPropertyValueMode(txt) {
      var rest = txt, done = "", s;<br>
      rest = "<span style=color:" + cssdelimitercolor + ">:</span>" + rest.substring(1);<br>
      while (rest.search(/!important/i) > -1) {
        s = rest.search(/!important/i);<br>
        done += rest.substring(0, s);<br>
        done += cssImportantMode(rest.substring(s, s + 10));<br>
        rest = rest.substr(s + 10);<br>
      }
      result = done + rest;<br>    
      if (result.substr(result.length - 1, 1) == ";<br>" && result.substr(result.length - 6, 6) != "&nbsp;<br>" && result.substr(result.length - 4, 4) != "&lt;<br>" && result.substr(result.length - 4, 4) != "&gt;<br>" && result.substr(result.length - 5, 5) != "&amp;<br>") {
        result = result.substring(0, result.length - 1) + "<span style=color:" + cssdelimitercolor + ">;<br></span>";<br>
      }
      return "<span style=color:" + csspropertyvaluecolor + ">" + result + "</span>";<br>
    }
    function cssImportantMode(txt) {
      return "<span style=color:" + cssimportantcolor + ";<br>font-weight:bold;<br>>" + txt + "</span>";<br>
    }
    function jsMode(txt) {
      var rest = txt, done = "", esc = [], i, cc, tt = "", sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos, dotpos, y;<br>
      for (i = 0;<br> i < rest.length;<br> i++)  {
        cc = rest.substr(i, 1);<br>
        if (cc == "\\") {
          esc.push(rest.substr(i, 2));<br>
          cc = "W3JSESCAPE";<br>
          i++;<br>
        }
        tt += cc;<br>
      }
      rest = tt;<br>
      y = 1;<br>
      while (y == 1) {
        sfnuttpos = getPos(rest, "'", "'", jsStringMode);<br>
        dfnuttpos = getPos(rest, '"', '"', jsStringMode);<br>
        compos = getPos(rest, /\/\*/, "*/", commentMode);<br>
        comlinepos = getPos(rest, /\/\//, "<br>", commentMode);<br>      
        numpos = getNumPos(rest, jsNumberMode);<br>
        keywordpos = getKeywordPos("js", rest, jsKeywordMode);<br>
        dotpos = getDotPos(rest, jsPropertyMode);<br>
        if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], keywordpos[0], dotpos[0]) == -1) {break;<br>}
        mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, dotpos);<br>
        if (mypos[0] == -1) {break;<br>}
        if (mypos[0] > -1) {
          done += rest.substring(0, mypos[0]);<br>
          done += mypos[2](rest.substring(mypos[0], mypos[1]));<br>
          rest = rest.substr(mypos[1]);<br>
        }
      }
      rest = done + rest;<br>
      for (i = 0;<br> i < esc.length;<br> i++) {
        rest = rest.replace("W3JSESCAPE", esc[i]);<br>
      }
      return "<span style=color:" + jscolor + ">" + rest + "</span>";<br>
    }
    function jsStringMode(txt) {
      return "<span style=color:" + jsstringcolor + ">" + txt + "</span>";<br>
    }
    function jsKeywordMode(txt) {
      return "<span style=color:" + jskeywordcolor + ">" + txt + "</span>";<br>
    }
    function jsNumberMode(txt) {
      return "<span style=color:" + jsnumbercolor + ">" + txt + "</span>";<br>
    }
    function jsPropertyMode(txt) {
      return "<span style=color:" + jspropertycolor + ">" + txt + "</span>";<br>
    }
    function getDotPos(txt, func) {
      var x, i, j, s, e, arr = [".","<", " ", ";<br>", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/" ,"-", "*", "|", "%"];<br>
      s = txt.indexOf(".");<br>
      if (s > -1) {
        x = txt.substr(s + 1);<br>
        for (j = 0;<br> j < x.length;<br> j++) {
          cc = x[j];<br>
          for (i = 0;<br> i < arr.length;<br> i++) {
            if (cc.indexOf(arr[i]) > -1) {
              e = j;<br>
              return [s + 1, e + s + 1, func];<br>
            }
          }
        }
      }
      return [-1, -1, func];<br>
    }
    function getMinPos() {
      var i, arr = [];<br>
      for (i = 0;<br> i < arguments.length;<br> i++) {
        if (arguments[i][0] > -1) {
          if (arr.length == 0 || arguments[i][0] < arr[0]) {arr = arguments[i];<br>}
        }
      }
      if (arr.length == 0) {arr = arguments[i];<br>}
      return arr;<br>
    }
    function sqlMode(txt) {
      var rest = txt, y, done = "", sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos;<br>
      y = 1;<br>
      while (y == 1) {
        sfnuttpos = getPos(rest, "'", "'", sqlStringMode);<br>
        dfnuttpos = getPos(rest, '"', '"', sqlStringMode);<br>
        compos = getPos(rest, /\/\*/, "*/", commentMode);<br>
        comlinepos = getPos(rest, /--/, "<br>", commentMode);<br>      
        numpos = getNumPos(rest, sqlNumberMode);<br>
        keywordpos = getKeywordPos("sql", rest, sqlKeywordMode);<br>
        if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], keywordpos[0]) == -1) {break;<br>}
        mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos);<br>
        if (mypos[0] == -1) {break;<br>}
        if (mypos[0] > -1) {
          done += rest.substring(0, mypos[0]);<br>
          done += mypos[2](rest.substring(mypos[0], mypos[1]));<br>
          rest = rest.substr(mypos[1]);<br>
        }
      }
      rest = done + rest;<br>
      return "<span style=color:" + sqlcolor + ">" + rest + "</span>";<br>
    }
    function sqlStringMode(txt) {
      return "<span style=color:" + sqlstringcolor + ">" + txt + "</span>";<br>
    }
    function sqlKeywordMode(txt) {
      return "<span style=color:" + sqlkeywordcolor + ">" + txt + "</span>";<br>
    }
    function sqlNumberMode(txt) {
      return "<span style=color:" + sqlnumbercolor + ">" + txt + "</span>";<br>
    }
    function phpMode(txt) {
      var rest = txt, done = "", sfnuttpos, dfnuttpos, compos, comlinepos, comhashpos, keywordpos, mypos, y;<br>
      y = 1;<br>
      while (y == 1) {
        sfnuttpos = getPos(rest, "'", "'", phpStringMode);<br>
        dfnuttpos = getPos(rest, '"', '"', phpStringMode);<br>
        compos = getPos(rest, /\/\*/, "*/", commentMode);<br>
        comlinepos = getPos(rest, /\/\//, "<br>", commentMode);<br>      
        comhashpos = getPos(rest, "#", "<br>", commentMode);<br>
        numpos = getNumPos(rest, phpNumberMode);<br>
        keywordpos = getKeywordPos("php", rest, phpKeywordMode);<br>      
        if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], comhashpos[0], keywordpos[0]) == -1) {break;<br>}
        mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, comhashpos, keywordpos);<br>
        if (mypos[0] == -1) {break;<br>}
        if (mypos[0] > -1) {
          done += rest.substring(0, mypos[0]);<br>
          done += mypos[2](rest.substring(mypos[0], mypos[1]));<br>
          rest = rest.substr(mypos[1]);<br>
        }
      }
      rest = done + rest;<br>
      rest = "<span style=color:" + phptagcolor + ">&lt;<br>" + rest.substr(4, 4) + "</span>" + rest.substring(8);<br>
      if (rest.substr(rest.length - 5, 5) == "?&gt;<br>") {
        rest = rest.substring(0, rest.length - 5) + "<span style=color:" + phptagcolor + ">?&gt;<br></span>";<br>
      }
      return "<span style=color:" + phpcolor + ">" + rest + "</span>";<br>
    }
    function phpStringMode(txt) {
      return "<span style=color:" + phpstringcolor + ">" + txt + "</span>";<br>
    }
    function phpNumberMode(txt) {
      return "<span style=color:" + phpnumbercolor + ">" + txt + "</span>";<br>
    }
    function phpKeywordMode(txt) {
      var glb = ["$GLOBALS","$_SERVER","$_REQUEST","$_POST","$_GET","$_FILES","$_ENV","$_COOKIE","$_SESSION"];<br>
      if (glb.indexOf(txt.toUpperCase()) > -1) {
        if (glb.indexOf(txt) > -1) {
          return "<span style=color:" + phpglobalcolor + ">" + txt + "</span>";<br>
        } else {
          return txt;<br>
        }
      } else {
        return "<span style=color:" + phpkeywordcolor + ">" + txt + "</span>";<br>
      }
    }
    function getKeywordPos(typ, txt, func) {
      var words, i, pos, rpos = -1, rpos2 = -1, patt;<br>
      if (typ == "js") {
        words = ["abstract","arguments","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete",
        "do","double","else","enum","eval","export","extends","false","final","finally","float","for","function","goto","if","implements","import",
        "in","instanceof","int","interface","let","long","NaN","native","new","null","package","private","protected","public","return","short","static",
        "super","switch","synchronized","this","throw","throws","transient","true","try","typeof","var","void","volatile","while","with","yield"];<br>
      } else if (typ == "php") {
        words = ["$GLOBALS","$_SERVER","$_REQUEST","$_POST","$_GET","$_FILES","$_ENV","$_COOKIE","$_SESSION",
        "__halt_compiler","abstract","and","array","as","break","callable","case","catch","class","clone","const","continue","declare","default",
        "die","do","echo","else","elseif","empty","enddeclare","endfor","endforeach","endif","endswitch","endwhile","eval","exit","extends","final","for",
        "foreach","function","global","goto","if","implements","include","include_once","instanceof","insteadof","interface","isset","list","namespace","new",
        "or","print","private","protected","public","require","require_once","return","static","switch","throw","trait","try","unset","use","var","while","xor"];<br>
      } else if (typ == "sql") {
        words = ["ADD","EXTERNAL","PROCEDURE","ALL","FETCH","PUBLIC","ALTER","FILE","RAISERROR","AND","FILLFACTOR","READ","ANY","READTEXT","AS","FOREIGN",
        "RECONFIGURE","ASC","FREETEXT","REFERENCES","AUTHORIZATION","FREETEXTTABLE","REPLICATION","BACKUP","FROM","RESTORE","BEGIN","FULL","RESTRICT","BETWEEN",
        "FUNCTION","RETURN","BREAK","GOTO","REVERT","BROWSE","GRANT","REVOKE","BULK","GROUP","RIGHT","BY","HAVING","ROLLBACK","CASCADE","HOLDLOCK","ROWCOUNT",
        "CASE","IDENTITY","ROWGUIDCOL","CHECK","IDENTITY_INSERT","RULE","CHECKPOINT","IDENTITYCOL","SAVE","CLOSE","IF","SCHEMA","CLUSTERED","IN",
        "SECURITYAUDIT","COALESCE","INDEX","SELECT","COLLATE","INNER","SEMANTICKEYPHRASETABLE","COLUMN","INSERT","SEMANTICSIMILARITYDETAILSTABLE","COMMIT",
        "INTERSECT","SEMANTICSIMILARITYTABLE","COMPUTE","INTO","SESSION_USER","CONSTRAINT","IS","SET","CONTAINS","JOIN","SETUSER","CONTAINSTABLE","KEY",
        "SHUTDOWN","CONTINUE","KILL","SOME","CONVERT","LEFT","STATISTICS","CREATE","LIKE","SYSTEM_USER","CROSS","LINENO","TABLE","CURRENT","LOAD","TABLESAMPLE",
        "CURRENT_DATE","MERGE","TEXTSIZE","CURRENT_TIME","NATIONAL","THEN","CURRENT_TIMESTAMP","NOCHECK","TO","CURRENT_USER","NONCLUSTERED","TOP","CURSOR",
        "NOT","TRAN","DATABASE","NULL","TRANSACTION","DBCC","NULLIF","TRIGGER","DEALLOCATE","OF","TRUNCATE","DECLARE","OFF","TRY_CONVERT","DEFAULT","OFFSETS",
        "TSEQUAL","DELETE","ON","UNION","DENY","OPEN","UNIQUE","DESC","OPENDATASOURCE","UNPIVOT","DISK","OPENQUERY","UPDATE","DISTINCT","OPENROWSET",
        "UPDATETEXT","DISTRIBUTED","OPENXML","USE","DOUBLE","OPTION","USER","DROP","OR","VALUES","DUMP","ORDER","VARYING","ELSE","OUTER","VIEW","END",
        "OVER","WAITFOR","ERRLVL","PERCENT","WHEN","ESCAPE","PIVOT","WHERE","EXCEPT","PLAN","WHILE","EXEC","PRECISION","WITH","EXECUTE","PRIMARY",
        "WITHIN GROUP","EXISTS","PRINT","WRITETEXT","EXIT","PROC","LIMIT","MODIFY","COUNT"];<br>
      }
      for (i = 0;<br> i < words.length;<br> i++) {
        if (typ == "php" || typ == "sql") {
          pos = txt.toLowerCase().indexOf(words[i].toLowerCase());<br>
        } else {
          pos = txt.indexOf(words[i]);<br>
        }
        if (pos > -1) {
          patt = /\W/g;<br>
          if (txt.substr(pos + words[i].length,1).match(patt) && txt.substr(pos - 1,1).match(patt)) {
            if (pos > -1 && (rpos == -1 || pos < rpos)) {
              rpos = pos;<br>
              rpos2 = rpos + words[i].length;<br>
            }
          }
        } 
      }
      return [rpos, rpos2, func];<br>
    }
    function getPos(txt, start, end, func) {
      var s, e;<br>
      s = txt.search(start);<br>
      e = txt.indexOf(end, s + (end.length));<br>
      if (e == -1) {e = txt.length;<br>}
      return [s, e + (end.length), func];<br>
    }
    function getNumPos(txt, func) {
      var arr = ["<br>", " ", ";<br>", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/" ,"-", "*", "|", "%", "="], i, j, c, startpos = 0, endpos, word;<br>
      for (i = 0;<br> i < txt.length;<br> i++) {
        for (j = 0;<br> j < arr.length;<br> j++) {
          c = txt.substr(i, arr[j].length);<br>
          if (c == arr[j]) {
            if (c == "-" && (txt.substr(i - 1, 1) == "e" || txt.substr(i - 1, 1) == "E")) {
              continue;<br>
            }
            endpos = i;<br>
            if (startpos < endpos) {
              word = txt.substring(startpos, endpos);<br>
              if (!isNaN(word)) {return [startpos, endpos, func];<br>}
            }
            i += arr[j].length;<br>
            startpos = i;<br>
            i -= 1;<br>
            break;<br>
          }
        }
      }  
      return [-1, -1, func];<br>
    }  
  }