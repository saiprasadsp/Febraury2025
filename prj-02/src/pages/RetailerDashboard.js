import React from 'react'

export default function RetailerDashboard() {
  return (
    <div className='container'>
        <div className="container text-center">
            <div className="row">
                <div className="col border rounded">
                    <h4>Add Balance</h4>
                    <div class="d-flex justify-content-center">
                        <div class="p-2"><button type="button" class="btn btn-primary">Basic</button>
                        </div>
                        <div class="p-2"><button type="button" class="btn btn-primary">Standard</button>
                        </div>
                        <div class="p-2"><button type="button" class="btn btn-primary">Premium</button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <h4>Available Balance</h4>
                2 of 2
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h4>Bank Transfer</h4>
                1 of 1
                </div>
                
            </div>
        </div>
    </div>
  )
}
