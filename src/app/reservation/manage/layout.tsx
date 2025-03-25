export default function ManageReservationLayout (
    {children, dashboard}: {children:React.ReactNode, dashboard:React.ReactNode} ) {
        return (
            <div className="flex flex-col w-full text-black">
                {children}
                {dashboard}

            </div>
        );
    }