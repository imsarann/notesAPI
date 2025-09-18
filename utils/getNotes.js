import fs from "fs";
export  function paginate(notes, page, limit){
    console.log(typeof notes)
    const p = Math.max(1, parseInt(page, 10))
    const l = Math.max(1, parseInt(limit, 10))
    const total = notes.length
    const start = (p - 1)* l
    const data = notes.slice(start, start + l)
    return { page: p, limit: l, total, data };
}

export function getId(notes, id){
    console.log("id ", id)
    for (const note of notes){
        if(note.id == id){
            console.log("type of note", note)
            return [note]
        }
    }
    return [] 
}

export function createNotes(notes, note){
    console.log(typeof note)
    const now = new Date();
    const isoString = now.toISOString();
    const newnote = {}
    newnote["id"] = generateId()
    newnote["title"] = note.title;
    newnote["body"] = note.body;
    newnote["tags"] = note.tags;
    newnote["createdAt"] = isoString,
    newnote["updatedAt"] = isoString,
    console.log(newnote)
    notes.push(newnote)
    try{
        fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2), "utf-8")
        return newnote;
    }catch(err){
        console.error("Error writing files: ", err)
    }
    return newnote
}


export function updateNote(id, notes, note){
    // console.log(typeof note)
    const updated_note = [] 
    for(const n of notes ){
        // console.log("hello", n.id)
        if(n.id == id){
            const now = new Date();
            const isoString = now.toISOString();
            n["title"] = note.title;
            n["body"] = note.body;
            n["tags"] = note.tags;
            n["updatedAt"] = isoString
            updated_note.push(n);
            break;
        }
    }
    // for(const n of notes){
    //     if(n.id == id){
    //         console.log("check updated notes",n)
    //     }
    // }
    try{
        console.log("Writing in notes ")
        fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2), "utf-8")
        return updated_note;
    }catch(err){
        console.error("Error in writing file :", err)
    }
}

export function deleteNotes(id, notes){
    const idx = notes.findIndex(note => note.id === id);
    if (idx === -1) return false;
    notes.splice(idx, 1);
    try{
        fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2), "utf-8")
        return true;
    } catch(err){
        console.error("Error in writing file :", err)
        return false;
    }
}

function generateId(){
    const arr = [
    'a','b','c','d','e','f','g','h','i','j','k','l','m',
    'n','o','p','q','r','s','t','u','v','w','x','y','z',
    '0','1','2','3','4','5','6','7','8','9'
    ]
    let id = ""
    for(let i = 0; i < 8; i++){
            const n = Math.floor(Math.random()*arr.length)
            id += arr[n];
    }
    console.log("id :",id)
    return id;
}