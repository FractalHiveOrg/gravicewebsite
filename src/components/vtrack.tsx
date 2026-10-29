export const VtrackLogo = ({size = 150,variant=""}: {size: number,variant?:string}) => {

    if(variant=="black")
    {

        return (
            
                <img src="/vtackBlack.svg" alt="" width={size} height={size} />
            
        )


    }else
    return (
        
            <img src="/vtrack.svg" alt="" width={size} height={size} />
        
    )
}

