/*
	- The Wagner-Fischer algorithm finds the Levenshtein distance between two words.
	- Better explaination at : https://openprocessing.org/sketch/2235259
*/
function WagnerFischer(s1, s2)
{
	//declare matrix
	let mat = [];
	for (let i = 0; i <= s1.length; i++)
		mat.push(new Array(s2.length+1).fill(0));
	
	//base cases
	for (let i = 1; i <= s1.length; i++)
		mat[i][0] = i;
	for (let j = 1; j <= s2.length; j++)
		mat[0][j] = j;
	
	//perform iterations
	for (let j = 1; j <= s2.length; j++)
	{
		for (let i = 1; i <= s1.length; i++)
		{
			let cost = (s1[i-1] == s2[j-1]) ? 0 : 1;
			mat[i][j] = Math.min(mat[i-1][j]+1, mat[i][j-1]+1, mat[i-1][j-1]+cost);
		}
	}

  //return the Levenshtein distance as the last entry of matrix (mat)
	return mat[s1.length][s2.length];
}


/*
  - Used to insert an element (v) into BK tree (t)
*/
function Insert(t,v)
{
	//get the distance
	let d = WagnerFischer(t.value, v);
	//insert directly if no other child with edge of the same length
	if (d in t.connections) Insert(t.connections[d],v);
	//insert recursively otherwise
	else t.connections[d] = {value:v,connections:{}};
}


/*
  - Used to Crawl the BK tree (t) for the word (v) using tolerance (N). Matches are appended to the array (matches)
*/
function Crawl(t,v,N,matches)
{
	//get principle distance
	let d = WagnerFischer(t.value, v);
	
	//get match if within tolerance
	if (d <= N)
		matches.push([t.value,d]);
	
	//iterate over tolerance to get all matches
	for (let i = d-N; i<=d+N; i++)
	{
		//ignore empty connections
		if (!(i in t.connections))
			continue;
		
		//crawl next child
		let m = Crawl(t.connections[i], v, N, matches);
	}
}

/*
  - Used to get the matches for word (v) in BK tree (t) using tolerance (N)
*/
function GetMatches(t,v,N)
{
	//just a call to "Crawl" with an empty array
	let m = [];
	Crawl(t,v,N,m);
	return m;
}
