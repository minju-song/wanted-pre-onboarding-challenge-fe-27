type Props = {
    children: React.ReactNode;
};

function BaseLayout ({children} : Props) {
    return (
        <div>
            {children}
        </div>
    );
}

export default BaseLayout;