title("Lisp Core Testing 0.1");

aload(["lib/tools/tools.js",
       "lib/ajax/ajax.js",
       "lib/prec-math/prec-math.js",
       "lib/lisp-tools/lisp-tools.js",
       "lib/lisp-parse/lisp-parse.js",
       "lib/lisp-exec/lisp-exec.js",
       "lib/lisp-core/lisp-core.js"], function (){

//// Evaluator ////

function testevl(a, x, f){
  return test('L.dsj(L.evl(L.prs("' + a + '")))', x, f);
}

testevl("(typ \\\"test\\\")", "str");
testevl("(typ 'test)", "sym");
testevl("(typ 253)", "num");
testevl("(typ has)", "jn");

testevl("`1", "1");
testevl("`a", "a");
testevl("`(a b c)", "(a b c)");
testevl("`(a b ,(+ 2 3))", "(a b 5)");
testevl("`,(+ 2 3)", "5");
testevl("`(a b `(c ,d ,,(+ 2 3)))", "(a b `(c ,d 5))");
testevl("``,,(+ 2 3)", "`5");
testevl("``,(+ 2 3)", "`,(+ 2 3)");
testevl("``(a b ,(c d ,(+ 2 3)))", "`(a b ,(c d 5))");
// ...

testevl("((tfn 'lin) 'lin)", "t");
testevl("((tfn 'lin) 'lns)", "nil");
testevl("((tfn [> _ 3]) 4)", "t");
testevl("((tfn [> _ 3]) 3)", "nil");
testevl("((tfn [> _ 3]) 2)", "nil");

testevl("(ohas {a 3} 'a)", "t");
testevl("(ohas {a 3} 'b)", "nil");

testevl("(let a {a 3} (oput a 'a 5) a)", "{a 5}");
testevl("(let a {a 3} (oput a 'b 5) a)", "{a 3 b 5}");

testevl("(let a {a 3} (owith a 'a 5))", "{a 5}");
testevl("(let a {a 3} (owith a 'a 5) a)", "{a 3}");

testevl("((fn ((o a 3)) a))", "3")

});