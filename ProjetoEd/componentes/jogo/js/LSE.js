class Node{
	constructor(x){
		this.key = x,
		this.next = null
	}
}

class LSE{
	constructor(){
		this.leng = 0,
		this.head = null,
		this.tail = null
	}
	size(){return this.leng}
	push(x){
		let u = new Node(x);
		if(this.leng === 0) this.tail = u;
		else u.next = this.head;
		this.head = u;
		this.leng++;
	}
	add(x){
		let u = new Node(x);
		if(this.leng === 0) this.head = u;
		else this.tail.next = u;
		this.tail = u;
		this.leng++;
	}
	pop(){
		if(this.leng === 0) return null;
		let x = this.head.key;
		this.head = this.head.next;
		this.leng--;
		if(this.leng === 0) this.tail = null;
		return x;
	}
	
	contElem(x){
		let u = this.head;
		while(u != null){
			if(u.key === x) return true;
			u = u.next;
		}
		return false;
	}
	
	longestSeq(){
		if(this.leng == 0) return {finish: null, tam: 0};
		if(this.leng == 1) return {finish: this.head.key, tam: 1};
		let count = 1;
		let longest = 1;
		let prev = this.head;
		let aux = prev.key;
		let u = prev.next;
		while(u != null){
			if(prev.key + 1 == u.key) count++;
			else count = 1;
			if(count > longest){
				aux = u.key;
				longest = count;
			}
			prev = u;
			u = u.next;
		}
		return {finish: aux, tam: longest};
	}
	
	print(){
		let x = this.head;
		while(x != null){
			console.log(x.key);
			x = x.next;
		}
	}
}