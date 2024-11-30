import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Company {
  company_id: number;
  company_name: string;
  stock_ticker?: string;
  incorporation_state: string;
  is_public: boolean;
}

const CompanyList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/companies');
      const data = await response.json();
      setCompanies(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch companies:', error);
      setIsLoading(false);
    }
  };

  const handleAddCompany = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    try {
      const response = await fetch('http://localhost:3000/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          company_name: formData.get('company_name'),
          stock_ticker: formData.get('stock_ticker'),
          incorporation_state: formData.get('incorporation_state'),
          is_public: Boolean(formData.get('is_public'))
        }),
      });

      if (response.ok) {
        setIsDialogOpen(false);
        fetchCompanies();
      }
    } catch (error) {
      console.error('Failed to add company:', error);
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Companies</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button className="bg-blue-500 text-white" onClick={() => setIsDialogOpen(true)}>
            Add Company
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddCompany} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Stock Ticker
                </label>
                <input
                  type="text"
                  name="stock_ticker"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Incorporation State
                </label>
                <input
                  type="text"
                  name="incorporation_state"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="is_public"
                  className="mr-2"
                />
                <label className="text-sm font-medium">
                  Is Public Company
                </label>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Add Company
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {companies.map((company) => (
            <div
              key={company.company_id}
              className="border rounded p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">{company.company_name}</h3>
                {company.stock_ticker && (
                  <span className="text-gray-600">{company.stock_ticker}</span>
                )}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                <p>State: {company.incorporation_state}</p>
                <p>Public: {company.is_public ? 'Yes' : 'No'}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyList;