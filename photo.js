// 갤러리 파일 정리 스크립트.
// Mp4,mov -> video
// Png,aae -> captured
// IMG_0710.jpg.. 편집된 파일 -> IMG_E0710
// 원본은 duplicated폴더로
// 원본파일 E+0710가 있다면, 0710을 duplicated로.. 없으면 패스

// node모듈 확인

//node에 인자로 폴더이름.

let targetFolder ='./photoFolder';

//폴더 경로도 자동으로 입력되면 좋겠다.
process.argv.forEach((val,index,arr)=>{
    console.log(index,':',val);
    targetFolder = './'+val;
})


const fs = require('fs');
const path = require('path');

const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
const dateObj = new Date();
const month = monthNames[dateObj.getMonth()];

mkDir('./',['testFolder','movie','duplicated'],month);



fs.readdir(targetFolder,(err,files)=>{
    files.forEach((file)=>{
        let extention = path.extname(file);
        
        switch(extention){
            case '.mp4':
            case '.mov':
                moveFile(targetFolder,'./movie',month,file);
                break;
            case '.png':
                moveFile(targetFolder,'./duplicated',month,file);
                break;
        };

    });
});

function moveFile(saveFrom,saveTo,month,file){
    const copyPath = path.join(saveFrom,file);
    const savePath = path.join(saveTo,month,file);

    fs.copyFile(path.normalize(copyPath),path.normalize(savePath),()=>{
        console.log(`${copyPath} to ${savePath}`);
    });
}

function mkDir(location,folders,month){
    folders.forEach((f)=>{
        let p = path.join(f,month);
        let newFolder1 = location+f;
        let newFolder2 = location+path.normalize(p);

        // 순서가 바뀌어서 실행되면 안되므로 promises 사용
        fs.promises.mkdir(newFolder1,()=>{
            console.log(newFolder1,'has made.');
        }).then(
            fs.mkdir(newFolder2,()=>{
                console.log(newFolder2,'has made.');
            })
        ).catch(e=>{
                console.log(e);
            }
        );
    });
}