import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
declare var Peer: any;

@Component({
  selector: 'app-viewstreaming',
  templateUrl: './viewstreaming.component.html',
  styleUrls: ['./viewstreaming.component.css']
})
export class ViewstreamingComponent implements OnInit {
  peer;
  mypeerId: any;
  other: any;
  boolean1=true;
  boolean2=false;
  @ViewChild('video') myVideo: any;
  constructor(private router:Router,private afs:AngularFirestore) { }

  ngOnInit(): void { 
    this.other = this.router.url.slice(12);
    this.peer = new Peer();
    setTimeout(() => {
      this.mypeerId = this.peer.id;
    },3000);
    this.peer.on('connection', function(conn) {
      conn.on('data', function(data){
        // Will print 'hi!'
        console.log(data);
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
    this.boolean1 = false;
    this.boolean2 = true;
    var conn = this.peer.connect(this.other);
    // on open will be launch when you successfully connect to PeerServer
    conn.on('open', function(id){
      // here you have conn.id
      
      conn.send('holoo'); 
    });
  }
  videoconnect() {
    this.boolean2 = false;
    let video = this.myVideo.nativeElement;
    var localvar = this.peer;
    var fname = this.other;
    //var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
     
    var n = <any>navigator;
    console.log(n);
    n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );
    
    n.getUserMedia({video: true, audio: true}, function(stream) {
      var call = localvar.call(fname, stream);
      call.on('stream', function(remotestream) {
        video.srcObject  = remotestream;
        console.log(remotestream);
        video.play();
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
