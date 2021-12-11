var N1 = {
	tam: 1,
	imgsHor: ['<img class="img" src="../imagens/subhrz.png"/>'],
	imgsVer: ['<img class="img" src="../imagens/subver.png"/>']
}

var N2 = {
	tam: 2,
	
	imgsHor: ['<img class="img" src="../imagens/nhrz1.png"/>',
			'<img class="img" src="../imagens/nhrz4.png"/>'],
			
	imgsVer: ['<img class="img" src="../imagens/nver1.png"/>',
			'<img class="img" src="../imagens/nver4.png"/>']
}

var N3 = {
	tam: 3,
	
	imgsHor: ['<img class="img" src="../imagens/nhrz1.png"/>',
			'<img class="img" src="../imagens/nhrz3.png"/>',
			'<img class="img" src="../imagens/nhrz4.png"/>'],
			
	imgsVer: ['<img class="img" src="../imagens/nver1.png"/>',
			'<img class="img" src="../imagens/nver3.png"/>',
			'<img class="img" src="../imagens/nver4.png"/>']
}

var N4 = {
	tam: 4,
	
	imgsHor: ['<img class="img" src="../imagens/nhrz1.png"/>',
			'<img class="img" src="../imagens/nhrz2.png"/>',
			'<img class="img" src="../imagens/nhrz3.png"/>',
			'<img class="img" src="../imagens/nhrz4.png"/>'],
			
	imgsVer: ['<img class="img" src="../imagens/nver1.png"/>',
			'<img class="img" src="../imagens/nver2.png"/>',
			'<img class="img" src="../imagens/nver3.png"/>',
			'<img class="img" src="../imagens/nver4.png"/>']
}

function getRandom(min, max){
	if(max < min)
		max, min = min, max;
	let rand = Math.random()*(1 + max - min) + min;
	return Math.floor(rand);
}

class MapNode{
	constructor(){
		this.val = null;
		let a = [];
		for(let i=0; i  < 10; i++){
			a.push(null);
		}
		this.next = a;
	}
}

class Map{
	costructor(){
		this.len = 0,
		this.root = null
	}
	
	insert(key,val){
		if(this.root == null){
			this.root = new MapNode();
			this.len = 0;
		}
		let x = this.root;
		for(let i = 0; i < 2; i++){
			let c = (x == this.root) ? key.charCodeAt(0) - 97 : parseInt(key[1],10);
			if(x.next[c] == null)
				x.next[c] = new MapNode();
			x = x.next[c];
		}
		x.val = val;
		this.len++;
	}
	
	get(key){
		let x = this.root;
		for(let i = 0; i < 2; i++){
			if(x == null) return null;
			let c = (x == this.root) ? key.charCodeAt(0) - 97 : parseInt(key[1],10);
			x = x.next[c];
		}
		if(x == null || x.val == null) return null;
		return x.val;
	}
	
	remove(key){
		let x = this.root;
		let c;
		for(let i = 0; i < 2; i++){
			if(x == null) return null;
			c = (x == this.root) ? key.charCodeAt(0) - 97 : parseInt(key[1],10);
			if(i < 1) x = x.next[c];
		}
		if(x.next[c] == null) return null;
		let y = x.next[c].val;
		x.next[c].val = null;
		return y;
	}
	
	ktmAux(x, pre, s, q){
		if(x == null) return;
		let d = pre.length;
		if(d == s.length){
			if(x.val != null) q.add(pre);
			return;
		}
		let nxt = s[d];
		for(let i = 0; i < 10; i++){
			let c = (x == this.root) ? String.fromCharCode(i+97) : String.fromCharCode(i+48);
			if(nxt == '.' || nxt == c)
			 this.ktmAux(x.next[i],pre+c,s,q);
		}
	}
	
	keysThatMatch(s){
		let q = new LSE();
		this.ktmAux(this.root,'',s,q);
		return q;
	}
	
	putHorz(nav){
			let t = nav.tam;
			let line = getRandom(97,106);
			line = String.fromCharCode(line);
			let q = this.keysThatMatch(line + '.');
			let list = new LSE();
			for(let i = 0; i < 10; i++){
				let box = line + i;
				if(!q.contElem(box)) list.add(i);
			}
			let seq = list.longestSeq();
			if(t <= seq.tam){
				let n = seq.finish + 1 - t;
				let init = seq.finish - seq.tam + 1;
				let rand = getRandom(init, n);
				for(let i = rand; i < rand + t; i++){
					this.insert(line + i, nav.imgsHor[i-rand]);
				}
				return false;
			}
			else return true;
	}
	
	putVert(nav){
			let t = nav.tam;
			let col = getRandom(0,9);
			col = col.toString();
			let q = this.keysThatMatch('.' + col);
			let list = new LSE();
			for(let i = 97; i < 107; i++){
				let box = String.fromCharCode(i) + col;
				if(!q.contElem(box)) list.add(i);
			}
			let seq = list.longestSeq();
			if(t <= seq.tam){
				let n = seq.finish + 1 - t;
				let init = seq.finish - seq.tam + 1;
				let rand = getRandom(init, n);
				for(let i = rand; i < rand + t; i++){
					this.insert(String.fromCharCode(i) + col, nav.imgsVer[i-rand]);
				}
				return false;
			}
			else return true;
	}

  putBombs(n){
    for(let i = 0; i < n; i++){
      let line = String.fromCharCode(getRandom(97,106));
      let col = getRandom(0,9);
      if(this.get(line + col) != null) i--;
      else this.insert(line + col, '<img class="img" src="../imagens/bomb.png"/>');
    }
  }
	
	distRand(nav,n){
		for(let i = 0; i < n; i++){
			let dir = getRandom(1,1000)%2;
			let fail;
			if(dir == 0) fail = this.putHorz(nav);
			else fail = this.putVert(nav);
			if(fail) i--;
		}
	}
	
	initialize(){
		this.distRand(N4,2);
		this.distRand(N3,3);
		this.distRand(N2,4);
		this.distRand(N1,4);
    this.putBombs(7);
	}
	
	print(){
		for(let i = 97; i < 107; i++){
			let c = String.fromCharCode(i);
			console.log(this.get(c+0)+ '/'+this.get(c+1)+'/'+this.get(c+2)+'/'+this.get(c+3)+'/'+this.get(c+4)+'/'+this.get(c+5)+'/'+this.get(c+6)+'/'+this.get(c+7)+'/'+this.get(c+8)+'/'+this.get(c+9));
			console.log('----------------------------------------------------------------------------')
		}
	}
}