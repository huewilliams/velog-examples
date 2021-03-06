import React, {useCallback, useState} from 'react';
import axios from 'axios';

interface Uploader {
    name: string;
}

function App() {
    const [file, setFile] = useState<File | null>(null);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) return;

        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }, []);

    const handleClick = useCallback(async () => {
        if (!file) return;

        const formData = new FormData();
        await formData.append('file', file);
        const uploader: Uploader = {name: 'huewilliams'};
        await formData.append('uploader', JSON.stringify(uploader));

        // for spring server
        // await formData.append('uploader', new Blob([JSON.stringify(uploader)], {type: 'application/json'}));

        const res = await axios.post(
            'http://localhost:4000/file/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        if (res.status === 201) console.log(res.data);
    }, [file]);

    return (
        <div>
            <input type={"file"} onChange={handleChange}/>
            <button onClick={handleClick}>업로드 요청</button>
        </div>
    );
}

export default App;
