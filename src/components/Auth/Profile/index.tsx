import { useEffect, useState } from "react"
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const UserProfilePage: React.FC = () => {
    const { GetProfile } = useActions();
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useTypedSelector((redux) => redux.auth);
    useEffect(() => {
        async function getProfile() {
            try {
                setLoading(true)
                await GetProfile()
                setLoading(false)
            }
            catch (ex) {
                console.log(ex)
            }
        }
        getProfile()

    }, [])
    return (
        <>
            {loading ? <h2>Loading...</h2> :
                <>
                    <h2>Profile</h2>
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="card px-3">
                                <div className="row py-1">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Name:</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        {user.name}
                                    </div>
                                </div>
                                <div>
                                    <div className="row py-1">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Email:</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {user.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}


export default UserProfilePage;