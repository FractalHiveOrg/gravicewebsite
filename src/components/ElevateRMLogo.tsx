export const ElevateRMLogo = ({size = 150,variant=""}: {size: number, variant?:string}) => {

if(variant=="black"){
return <img src="/ElevateRMLogoBlack.svg" alt="" width={size} height={size} />
}else
    return (
        
            <img src="/ElevateRMLogo.svg" alt="" width={size} height={size} />
        
    )
}

