import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
//import * as Peer from 'peerjs';
declare var Peer: any;
//import * as per from 'peerjs';
@Component({
  selector: 'app-streaming',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.css']
})
export class StreamingComponent implements OnInit {
  peer;
  anotherid;
  mypeerId;
  lop;

  @ViewChild('myvideo') myVideo: any;
  @ViewChild('video2') myVideo2: any;

  constructor(private afs:AngularFirestore,private router:Router) {
    
  }

  ngOnInit(): void {
    this.peer = new Peer();
    console.log(this.peer.id); 
    let value;
    setTimeout(() => {
      this.mypeerId = this.peer.id;
      this.afs.collection('stream').doc(this.router.url.slice(11)).set({id:this.mypeerId},{merge:true})
    }, 3000); 
    this.peer.on('connection', function(conn) {
      conn.on('data', function(data){
        // Will print 'hi!'
        console.log(this.peer.id);
        this.anotherid = data;
        value = data;
        this.lop = value;
        console.log(this.lop);
      });
    });
    setTimeout(() => {
    let video = this.myVideo.nativeElement;
    var n = <any>navigator;
    
    n.getUserMedia =  ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia || n.msGetUserMedia );
    
    this.peer.on('call', function(call) {
      
      n.getUserMedia({video: true, audio: true}, function(stream) {
        call.answer(stream);
        call.on('stream', function(remotestream){
          video.srcObject  = remotestream;
          console.log(remotestream);
          video.play();
        })
      }, function(err) {
        console.log('Failed to get stream', err);
      })
    })
       }, 3000); 
  }

  connect() {
      var conn = this.peer.connect(this.anotherid);
      // on open will be launch when you successfully connect to PeerServer
    console.log(this.mypeerId);
    var olo = this.mypeerId;
      conn.on('open', function(id){
        // here you have conn.id
        console.log(olo); 
        conn.send(olo); 
      });
  }
  videoconnect(){
    let video = this.myVideo.nativeElement;
    let video2 = this.myVideo2.nativeElement;
    var localvar = this.peer;
    var fname = this.anotherid;
    console.log(this.anotherid);
    //var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
     
    var n = <any>navigator;
    console.log(n);
    n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );
    
    n.getUserMedia({video: true, audio: true}, function(stream) {
      var call = localvar.call(fname, stream);
      call.on('stream', function(remotestream) {
        video2.srcObject  = remotestream;
        console.log(remotestream);
        video2.play();
      })
    }, function(err){
      console.log('Failed to get stream', err);
    }) 
    this.peer.on('call', function(call) {
      
      n.getUserMedia({video: true, audio: true}, function(stream) {
        call.answer(stream);
        call.on('stream', function (remotestream) {
          video.srcObject  = remotestream;
          video.play();
        })
      }, function(err) {
        console.log('Failed to get stream', err);
      })
    })
    
  }
  
}
