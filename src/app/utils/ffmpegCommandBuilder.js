import ConversionTask from "../ui/ConversionTaskItem";


class FfMpegCommandBuilder {

    constructor(conversionTask) {
        this.conversionTask = conversionTask;
    }

    build() {
        const {file, targetFormat,requestArguments} = fileData;
        const args = requestArguments.get(targetFormat);

        var joinedArgs = [];
        if(args){
            joinedArgs = Array.from(args[Symbol.iterator]().map(a=>a.join('=')));
        }

        return ['-i', file.name, fileData.getOutputFileName(),"-filter:v"].concat(joinedArgs);
    }
}

export default FfMpegCommandBuilder;